import { describe, it, expect } from 'vitest'

import useAverage from '@/composables/useAverage'

describe('useAverage', () => {
  const dataset = ref<number[]>([])
  const average = useAverage(dataset)

  it('0 if array is empty', () => {
    expect(average.value).toBe(0)
  })

  it('same value as the value of the only element', () => {
    dataset.value = [10]
    nextTick(() => expect(average.value).toBe(10))
  })

  it('average of 3 elements', () => {
    dataset.value = [10, 5, 67]
    nextTick(() => expect(average.value).toBe((10 + 5 + 67) / 3))
  })
})
