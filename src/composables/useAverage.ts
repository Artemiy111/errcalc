import type { Ref } from 'vue'

export default (dataset: Ref<number[]>) => {
  const average = ref(0)

  watchEffect(() => {
    if (dataset.value.length === 0) return 0

    const sum = dataset.value.reduce((acc, item) => acc + item)

    average.value = sum / dataset.value.length
  })

  return average
}
