<script setup lang="ts">
import { ref, computed } from 'vue'
import { DataItem, FilteredDataItem } from '@/../types'

import InputData from '@/components/InputData.vue'
import ErrorCalculation from '@/components/ErrorCalculation.vue'

const inputData = ref<DataItem[]>([])
const filteredData = computed(
  () => inputData.value.filter(item => item.data !== null) as FilteredDataItem[]
)
</script>

<template>
  <main>
    <div class="container mx-auto px-5">
      <h1 class="mt-10 font-bold">Калькулятор погрешностей</h1>
      <div class="mt-10 flex flex-nowrap flex-col md:flex-row gap-20">
        <InputData v-model="inputData" />
        <ErrorCalculation :dataset="filteredData" />
      </div>
    </div>
  </main>
</template>
