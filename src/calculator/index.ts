import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import * as O from 'fp-ts/Option'
import * as M from 'fp-ts/Monoid'

const getSum = M.concatAll(N.MonoidSum)

const getDividedBy = (divisor: number) => (x: number) => divisor === 0 ? 0 : x / divisor

const getAverage = (xs: number[]): number => pipe(xs, getSum, getDividedBy(A.size(xs)))

export const getAverageWithAccuracy = (accuracy: number) => (xs: number[]) =>
  pipe(xs, getAverage, (avg) => avg.toFixed(accuracy), parseFloat)

const getSqrDiff = (avg: number) => (n: number) => (avg - n) ** 2

const getSumOfSqrDiffs = (avg: number) => (xs: number[]) => pipe(xs, A.map(getSqrDiff(avg)), getSum)

export const getRandomErrorSimple = (avg: number) => (xs: number[]) =>
  pipe(xs, getSumOfSqrDiffs(avg), Math.sqrt, getDividedBy(A.size(xs)), getCustomRounded)

export const getRandomErrorFull = (avg: number) => (xs: number[]) =>
  pipe(
    xs,
    getSumOfSqrDiffs(avg),
    getDividedBy(A.size(xs) * (A.size(xs) - 1)),
    Math.sqrt,
    getCustomRounded
  )

export const getCustomRounded = (x: number): number =>
  pipe(
    x,
    (n) => n.toString().split('.'),
    A.reverse,
    A.head,
    O.match(
      () => x,
      (s) => {
        const getCountSymbolsAfterDot = (stringAfterDot: string): number => {
          return stringAfterDot.length === 0
            ? 0
            : stringAfterDot[0] === '0'
            ? 1 + getCountSymbolsAfterDot(stringAfterDot.slice(1))
            : stringAfterDot[0] === '1'
            ? 2
            : 1
        }
        return parseFloat(x.toFixed(getCountSymbolsAfterDot(s)))
      }
    )
  )

export const getFullError = (randomError: number) => (systematicError: number) =>
  pipe(randomError ** 2 + systematicError ** 2, Math.sqrt, getCustomRounded)

export const getAbsoluteError = (avg: number) => (x: number) => Math.abs(avg - x)

export const getRelativeError = (avg: number) => (x: number) =>
  avg === 0 ? 0 : getAbsoluteError(avg)(x) / avg
