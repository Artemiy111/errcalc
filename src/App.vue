<script setup lang="ts">
import { ref, computed } from 'vue'
import { DataItem, FilteredDataItem } from '@/types'

import InputData from '@/components/InputData.vue'
import ErrorCalculation from '@/components/ErrorCalculation.vue'
import TheHeader from './components/TheHeader.vue'

const inputData = ref<DataItem[]>([])
const filteredData = computed(
  () => inputData.value.filter((item) => item.data !== null) as FilteredDataItem[]
)
</script>

<template>
  <div class="container mx-auto px-5 transition-all">
    <TheHeader class="mt-10" />
    <div class="mt-10 flex flex-col flex-nowrap gap-20 md:flex-row">
      <InputData v-model="inputData" />
      <ErrorCalculation :dataset="filteredData" />
    </div>
  </div>
</template>
