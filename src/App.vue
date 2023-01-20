<script setup lang="ts">
import { InputDataItem } from '@/types'

const inputData = ref<InputDataItem[]>([])

const dataset = computed(
  () => inputData.value.filter((item) => item.data !== null).map((item) => item.data) as number[]
)
</script>

<template>
  <div class="container mx-auto px-5 transition-all">
    <TheHeader class="mt-10" />
    <div class="mt-10 mb-10 flex flex-col flex-nowrap gap-x-20 gap-y-10 md:flex-row">
      <InputData v-model="inputData" class="md:w-40" />
      <ErrorCalculation :dataset="dataset" />
    </div>
  </div>
</template>
