import { it, expect } from 'vitest'

import useAverage from '@/composables/useAverage'

const dataset = ref<number[]>([])
const average = useAverage(dataset)

it('is 0 if array is empty', () => {
  expect(average.value).toBe(0)
})

it('is value of the only element', () => {
  dataset.value = [10]
  expect(average.value).toBe(10)
})

it('is average of 3 elements', () => {
  dataset.value = [10, 5, 67]
  expect(average.value).toBe((10 + 5 + 67) / 3)
})
