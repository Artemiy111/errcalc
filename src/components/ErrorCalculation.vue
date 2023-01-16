<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { FilteredDataItem, RandomErrorFormula } from '@/types'

import { useAverage } from '@/composables/useAverage'
import { useRandomError } from '@/composables/useRandomError'
import { customRounded } from '@/utils/customRounded'

const props = defineProps<{
  dataset: FilteredDataItem[]
}>()

const dataset = toRef(props, 'dataset')

const average = useAverage(dataset)
const decimalPlaces = ref(3)
const formatedAverage = computed<number>(() => +average.value.toFixed(decimalPlaces.value))

const randomErrorFormula = ref<RandomErrorFormula>('full')

const changeRandomErrorFormula = (event: Event) => {
  const value = (event.target as HTMLInputElement).value as RandomErrorFormula
  randomErrorFormula.value = value
}

const randomErrorFull = useRandomError(average, dataset, 'full')
const randomErrorSimplified = useRandomError(average, dataset, 'simplified')

const systematicError = ref(0)

const fullError = computed<number>(() =>
  randomErrorFormula.value === 'full'
    ? (randomErrorFull.value ** 2 + systematicError.value ** 2) ** 0.5
    : (randomErrorSimplified.value ** 2 + systematicError.value ** 2) ** 0.5
)

const formatedFullError = computed<number>(() => customRounded(fullError))
</script>

<template>
  <section class="">
    <section>
      <div class="flex gap-5">
        <span>Среднее значение</span>
        <span class="text-blue-500">{{ formatedAverage }}</span>
      </div>
      <div class="group mt-3 flex gap-5">
        <span class="w-fit whitespace-nowrap">Знаков после запятой</span>
        <input
          type="number"
          v-model.number="decimalPlaces"
          min="1"
          max="9"
          class="w-full rounded-md bg-transparent font-bold outline-none transition focus:ring-2 focus:ring-zinc-50 group-hover:bg-zinc-50 dark:focus:ring-2 dark:focus:ring-zinc-800 dark:group-hover:bg-zinc-800"
        />
      </div>
    </section>
    <section class="mt-10 flex flex-col gap-3">
      <span>Формула случайной погрешности</span>

      <div class="flex flex-wrap gap-3">
        <label class="block">
          <input
            type="radio"
            name="random-error"
            value="full"
            checked
            class="peer hidden"
            @change="changeRandomErrorFormula"
          />
          <div
            class="w-fit cursor-pointer rounded-xl border-2 border-transparent transition hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:invert dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-1.svg"
              alt=""
              class="m-3 h-[60px] w-max [user-select:none]"
            />
          </div>
        </label>
        <label class="block">
          <input
            type="radio"
            name="random-error"
            value="simplified"
            class="peer hidden"
            @change="changeRandomErrorFormula"
          />
          <div
            class="w-fit cursor-pointer rounded-xl border-2 border-transparent transition hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:invert dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-2.svg"
              alt=""
              class="m-3 h-[60px] [user-select:none] dark:invert"
            />
          </div>
        </label>
      </div>
      <div class="flex gap-5">
        <span>Случайная погрешность</span>
        <span class="text-blue-500">{{
          randomErrorFormula === 'full' ? randomErrorFull : randomErrorSimplified
        }}</span>
      </div>
    </section>
    <section class="mt-10">
      <div class="group flex flex-nowrap gap-5">
        <span class="whitespace-nowrap">Систематическая погрешность</span>
        <input
          type="number"
          v-model.number="systematicError"
          min="0"
          max="9"
          class="w-full rounded-md bg-transparent font-bold outline-none transition group-hover:bg-zinc-50 dark:focus:ring-2 dark:focus:ring-zinc-800 dark:group-hover:bg-zinc-800"
        />
      </div>
    </section>
    <section class="mt-10 mb-10 flex flex-col gap-3">
      <span>Формула полной погрешности</span>
      <div class="w-fit rounded-xl border-2 border-zinc-900 transition dark:border-zinc-300">
        <img
          src="@/assets/img/full-error.svg"
          alt=""
          class="m-3 h-[50px] [user-select:none] dark:invert"
        />
      </div>
      <div class="flex gap-5">
        <span>Полная погрешность</span>
        <span class="text-green-600">{{ formatedFullError }}</span>
      </div>
    </section>
  </section>
</template>
