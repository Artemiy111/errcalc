import { type Ref, computed } from 'vue'
import type { FilteredDataItem, RandomErrorFormula } from '@/../types'
import { customRounded } from '@/utils/customRounded'

export const useRandomError = (
  average: Ref<number>,
  dataItems: Ref<FilteredDataItem[]>,
  randomErrorFormula: RandomErrorFormula
) => {
  switch (randomErrorFormula) {
    case 'full':
      return computed<number>(() => {
        const count = dataItems.value.length

        if (count === 0 || count === 1) return 0

        let error = 0
        dataItems.value.forEach(dataItem => {
          error += (average.value - dataItem.data) ** 2
        })
        error = error / (count * (count - 1))
        error = error ** 0.5
        return customRounded(error)
      })

    case 'simplified':
      return computed<number>(() => {
        const count = dataItems.value.length

        if (count === 0 || count === 1) return 0

        let error = 0
        dataItems.value.forEach(dataItem => {
          error += (average.value - dataItem.data) ** 2
        })
        error = error ** 0.5
        error = error / count
        return customRounded(error)
      })
  }
}
