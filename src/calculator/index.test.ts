import { describe, expect, it } from 'vitest'
import {
  getAbsoluteError,
  getAverageWithAccuracy,
  getCustomRounded,
  getRandomErrorFull,
  getRandomErrorSimple,
  getRelativeError,
} from '.'

it('with integer', () => {
  expect(getCustomRounded(0)).toBe(0)
  expect(getCustomRounded(100)).toBe(100)
})

it('high accuracy', () => {
  expect(getCustomRounded(0.123)).toBe(0.12)
  expect(getCustomRounded(0.0001234)).toBe(0.00012)
  expect(getCustomRounded(0.0001299)).toBe(0.00013)
})

it('standart accuracy', () => {
  expect(getCustomRounded(0.2345)).toBe(0.2)
  expect(getCustomRounded(0.299)).toBe(0.3)
  expect(getCustomRounded(0.000299)).toBe(0.0003)
})

it('absolute error', () => {
  expect(getAbsoluteError(0)(0)).toBe(0)
  expect(getAbsoluteError(10)(0)).toBe(10)
  expect(getAbsoluteError(10)(3)).toBe(7)
})

it('relative error', () => {
  expect(getRelativeError(0)(0)).toBe(0)
  expect(getRelativeError(10)(1)).toBe(0.9)
  expect(getRelativeError(10)(5)).toBe(0.5)
})

describe('full', () => {
  const accuracy = 3
  let dataset: number[] = []
  it('is 0 if dataset is empty', () => {
    expect(getRandomErrorFull(accuracy)(dataset)).toBe(0)
  })

  it('is 0 if 1 item in dataset', () => {
    dataset = [999]
    expect(getRandomErrorFull(accuracy)(dataset)).toBe(0)
  })
  it('is 0 if 3 equal items in dataset', () => {
    dataset = [999, 999, 999]
    expect(getRandomErrorFull(getAverageWithAccuracy(accuracy)(dataset))(dataset)).toBe(0)
  })

  it('with 3 items', () => {
    dataset = [5, 10, 15]
    const avg = +((5 + 10 + 15) / 3).toFixed(accuracy)
    const res = (((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) / (3 * (3 - 1))) ** 0.5

    expect(getRandomErrorFull(getAverageWithAccuracy(accuracy)(dataset))(dataset)).toBe(
      getCustomRounded(res),
    )
  })
})

describe('simplified', () => {
  const accuracy = 3
  let dataset: number[] = []
  it('is 0 if dataset is empty', () => {
    dataset = []

    expect(getRandomErrorSimple(accuracy)(dataset)).toBe(0)
  })

  it('is 0 if 1 item in dataset', () => {
    dataset = [999]

    expect(getRandomErrorSimple(getAverageWithAccuracy(accuracy)(dataset))(dataset)).toBe(0)
  })

  it('is 0 if 3 equal items in dataset', () => {
    dataset = [999, 999, 999]
    expect(getRandomErrorSimple(getAverageWithAccuracy(accuracy)(dataset))(dataset)).toBe(0)
  })

  it('with 3 items', () => {
    dataset = [5, 10, 15]
    const avg = (5 + 10 + 15) / 3
    const res = ((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) ** 0.5 / 3

    expect(getRandomErrorSimple(getAverageWithAccuracy(accuracy)(dataset))(dataset)).toBe(
      getCustomRounded(res),
    )
  })
})
