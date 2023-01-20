<script setup lang="ts">
import { InputDataItem } from '@/types'

const inputData = ref<InputDataItem[]>([])

const dataset = computed(
  () => inputData.value.filter((item) => item.data !== null).map((item) => item.data) as number[]
)
</script>

<template>
  <main>
    <InputData v-model="inputData" class="md:w-48" />
    <ErrorCalculation :dataset="dataset" />
  </main>
</template>
