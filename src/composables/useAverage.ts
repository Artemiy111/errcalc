import type { Ref } from 'vue'

export default (dataset: Ref<number[]>) =>
  computed(() => {
    if (dataset.value.length === 0) return 0
    const sum = dataset.value.reduce((acc, item) => acc + item)
    return sum / dataset.value.length
  })
