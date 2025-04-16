import { pipe } from 'effect/Function'
import * as A from 'effect/Array'
import * as O from 'effect/Option'
import * as N from 'effect/Number'

const getSum = (xs: number[]) => pipe(xs, A.reduce(0, N.sum))


const getDividedBy = (divisor: number) => (x: number) => divisor === 0 ? 0 : x / divisor

const getAverage = (xs: number[]): number =>
  pipe(xs, getSum, getDividedBy(xs.length))

export function getAverageWithAccuracy(accuracy: number) {
  return (xs: number[]): number =>
    pipe(xs, getAverage, avg => avg.toFixed(accuracy), Number.parseFloat)
}

const getSqrDiff = (avg: number) => (n: number) => (avg - n) ** 2

const getSumOfSqrDiffs = (avg: number) => (xs: number[]) =>
  pipe(xs, A.map(getSqrDiff(avg)), getSum)

export function getRandomErrorSimple(avg: number) {
  return (xs: number[]) =>
    pipe(xs, getSumOfSqrDiffs(avg), Math.sqrt, getDividedBy(xs.length), getCustomRounded)
}

export function getRandomErrorFull(avg: number) {
  return (xs: number[]) =>
    pipe(
      xs,
      getSumOfSqrDiffs(avg),
      getDividedBy(xs.length * (xs.length - 1)),
      Math.sqrt,
      getCustomRounded
    )
}

export function getCustomRounded(x: number): number {
  return pipe(
    x.toString().split('.'),
    A.reverse,
    A.head,
    O.match({
      onNone: () => x,
      onSome: (s) => {
        const getCountSymbolsAfterDot = (stringAfterDot: string): number => {
          return stringAfterDot.length === 0
            ? 0
            : stringAfterDot[0] === '0'
              ? 1 + getCountSymbolsAfterDot(stringAfterDot.slice(1))
              : stringAfterDot[0] === '1'
                ? 2
                : 1
        }
        return Number.parseFloat(x.toFixed(getCountSymbolsAfterDot(s)))
      }
    })
  )
}

export function getFullError(randomError: number) {
  return (systematicError: number) =>
    pipe(randomError ** 2 + systematicError ** 2, Math.sqrt, getCustomRounded)
}

export const getAbsoluteError = (avg: number) => (x: number) => Math.abs(avg - x)

export function getRelativeError(avg: number) {
  return (x: number) =>
    avg === 0 ? 0 : getAbsoluteError(avg)(x) / avg
}
