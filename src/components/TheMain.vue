<script setup lang="ts">
import ErrorCalculation from './ErrorCalculation.vue'
import InputDataset from './InputDataset.vue'

export interface InputDatasetItem {
  id: string
  data: number | null
}

const inputData = ref<InputDatasetItem[]>([])

const dataset = computed(
  () => inputData.value.filter(item => item.data !== null).map(item => item.data) as number[],
)
</script>

<template>
  <main class="">
    <div class="flex flex-col flex-nowrap justify-between gap-x-20 gap-y-10 md:flex-row">
      <InputDataset v-model="inputData" class="md:max-w-[12rem]" />
      <ErrorCalculation :dataset="dataset" class="" />
    </div>
    <div class="mt-20">
      <h2 class="text-2xl font-bold">
        Расчёт погрешности косвенных измерений
      </h2>
      <div class="mt-5 flex flex-col gap-2">
        <span>В общем виде</span>
        <div
          class="w-full rounded-xl border-2 border-zinc-900 transition-colors sm:w-fit dark:border-zinc-300"
        >
          <img
            src="@/assets/img/indirect-error.svg"
            alt="indirect error"
            class="mx-auto h-[80px] p-3 [user-select:none] dark:invert"
          >
        </div>
      </div>
      <div class="mt-5 flex flex-col gap-2">
        <span>Для частных случаев</span>
        <div
          class="w-full rounded-xl border-2 border-zinc-900 transition-colors sm:w-fit dark:border-zinc-300"
        >
          <img
            src="@/assets/img/equation1.svg"
            alt="indirect error"
            class="mx-auto h-[80px] p-3 [user-select:none] dark:invert"
          >
        </div>
        <div
          class="w-full rounded-xl border-2 border-zinc-900 transition-colors sm:w-fit dark:border-zinc-300"
        >
          <img
            src="@/assets/img/equation2.svg"
            alt="indirect error"
            class="mx-auto h-[80px] p-3 [user-select:none] dark:invert"
          >
        </div>
        <div
          class="w-full rounded-xl border-2 border-zinc-900 transition-colors sm:w-fit dark:border-zinc-300"
        >
          <img
            src="@/assets/img/equation3.svg"
            alt="indirect error"
            class="mx-auto h-[80px] p-3 [user-select:none] dark:invert"
          >
        </div>
      </div>
    </div>
  </main>
</template>
