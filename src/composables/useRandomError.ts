import type { Ref } from 'vue'

import customRounded from '@/helpers/customRounded'

export type RandomErrorFormula = 'full' | 'simplified'

export default (
  average: Ref<number>,
  dataset: Ref<number[]>,
  randomErrorFormula: RandomErrorFormula
) => {
  switch (randomErrorFormula) {
    case 'full':
      return computed<number>(() => {
        const count = dataset.value.length

        if (count === 0 || count === 1) return 0

        let error = 0
        dataset.value.forEach((dataItem) => {
          error += (average.value - dataItem) ** 2
        })
        error = error / (count * (count - 1))
        error = error ** 0.5
        return customRounded(error)
      })

    case 'simplified':
      return computed<number>(() => {
        const count = dataset.value.length

        if (count === 0 || count === 1) return 0

        let error = 0
        dataset.value.forEach((dataItem) => {
          error += (average.value - dataItem) ** 2
        })
        error = error ** 0.5
        error = error / count
        return customRounded(error)
      })
  }
}
