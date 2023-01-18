import customRounded from '@/utils/customRounded'
import { describe, it, expect } from 'vitest'

import useRandomError from '@/composables/useRandomError'
import useAverage from '@/composables/useAverage'

describe('useRandomError', () => {
  const dataset = ref<number[]>([])
  const average = useAverage(dataset)

  const randomErrorFull = useRandomError(average, dataset, 'full')
  const randomErrorSimplified = useRandomError(average, dataset, 'simplified')

  describe('randomError full', () => {
    it('0 if dataset is empty', () => {
      dataset.value = []

      nextTick(() => {
        expect(randomErrorFull.value).toBe(0)
      })
    })

    it('0 if 1 item in dataset', () => {
      dataset.value = [999]

      nextTick(() => {
        expect(randomErrorFull.value).toBe(0)
      })
    })

    it('with 3 items', () => {
      dataset.value = [5, 10, 15]
      const avg = (5 + 10 + 15) / 3
      const res = (((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) / (3 * (3 - 1))) ** 0.5

      nextTick(() => {
        expect(randomErrorFull.value).toBe(customRounded(res))
      })
    })
  })

  describe('randomError simplified', () => {
    it('0 if dataset is empty', () => {
      dataset.value = []

      nextTick(() => {
        expect(randomErrorSimplified.value).toBe(0)
      })
    })

    it('0 if 1 item in dataset', () => {
      dataset.value = [999]

      nextTick(() => {
        expect(randomErrorSimplified.value).toBe(0)
      })
    })

    it('with 3 items', () => {
      dataset.value = [5, 10, 15]
      const avg = (5 + 10 + 15) / 3
      const res = ((5 - avg) ** 2 + (10 - avg) ** 2 + (15 - avg) ** 2) ** 0.5 / 3

      nextTick(() => {
        expect(randomErrorSimplified.value).toBe(customRounded(res))
      })
    })
  })
})
