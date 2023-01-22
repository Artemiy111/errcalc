import { describe, it, test, expect } from 'vitest'

import useRandomError from '@/composables/useRandomError'
import useAverage from '@/composables/useAverage'
import customRounded from '@/helpers/customRounded'

const dataset = ref<number[]>([])
const average = useAverage(dataset)

const randomErrorFull = useRandomError(average, dataset, 'full')
const randomErrorSimplified = useRandomError(average, dataset, 'simplified')

describe('full', () => {
  it('is 0 if dataset is empty', () => {
    dataset.value = []

    expect(randomErrorFull.value).toBe(0)
  })

  it('is 0 if 1 item in dataset', () => {
    dataset.value = [999]

    expect(randomErrorFull.value).toBe(0)
  })

  test('with 3 items', () => {
    dataset.value = [5, 10, 15]
    const avg = (5 + 10 + 15) / 3
    const res = (((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) / (3 * (3 - 1))) ** 0.5

    expect(randomErrorFull.value).toBe(customRounded(res))
  })
})

describe('simplified', () => {
  it('is 0 if dataset is empty', () => {
    dataset.value = []

    expect(randomErrorSimplified.value).toBe(0)
  })

  it('is 0 if 1 item in dataset', () => {
    dataset.value = [999]

    expect(randomErrorSimplified.value).toBe(0)
  })

  test('with 3 items', () => {
    dataset.value = [5, 10, 15]
    const avg = (5 + 10 + 15) / 3
    const res = ((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) ** 0.5 / 3

    expect(randomErrorSimplified.value).toBe(customRounded(res))
  })
})
