<script setup lang="ts">
import { InputDataItem } from '@/types'

const inputData = ref<InputDataItem[]>([])

const dataset = computed(
  () => inputData.value.filter((item) => item.data !== null).map((item) => item.data) as number[]
)
</script>

<template>
  <main class="flex flex-col flex-nowrap justify-between gap-x-20 gap-y-10 md:flex-row">
    <InputData v-model="inputData" class="md:max-w-[12rem]" />
    <ErrorCalculation :dataset="dataset" class="" />
  </main>
</template>
