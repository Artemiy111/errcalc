import { ref, type Ref, watch } from 'vue'
import type { FilteredDataItem } from '../types'

export const useAverage = (dataItems: Ref<FilteredDataItem[]>) => {
  const average = ref(0)

  watch(
    () => dataItems.value,
    () => {
      if (dataItems.value.length === 0) return 0

      let sum = 0
      dataItems.value.forEach((item) => {
        sum += item.data
      })

      average.value = sum / dataItems.value.length
    }
  )

  return average
}
