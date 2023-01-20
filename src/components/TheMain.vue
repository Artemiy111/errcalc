<script setup lang="ts">
import { InputDataItem } from '@/types'

const inputData = ref<InputDataItem[]>([])

const dataset = computed(
  () => inputData.value.filter((item) => item.data !== null).map((item) => item.data) as number[]
)
</script>

<template>
  <main>
    <InputData v-model="inputData" class="md:min-w-[11rem]" />
    <ErrorCalculation :dataset="dataset" />
  </main>
</template>
