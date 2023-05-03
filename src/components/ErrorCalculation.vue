<script setup lang="ts">
import BaseInput from './BaseInput.vue'

import {
  getAverageWithAccuracy,
  getFullError,
  getRandomErrorFull,
  getRandomErrorSimple,
} from '@/calculator'

import { z } from 'zod'

const props = defineProps<{
  dataset: number[]
}>()

type RandomErrorType = 'full' | 'simple'

const dataset = toRef(props, 'dataset')

const defaultAccuracy = 3
const averageAccuracySchema = z.number().int().min(1).max(5)
const averageAccuracy = ref(defaultAccuracy)

const setAverageAccuracy = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = parseFloat((event.target as HTMLInputElement).value)

  const result = averageAccuracySchema.safeParse(newValue)
  if (!result.success) {
    if (newValue < 1) {
      averageAccuracy.value = 1
      target.value = (1).toString()
    }
    if (newValue > 5) {
      averageAccuracy.value = 5
      target.value = (5).toString()
    }
    return
  }
  averageAccuracy.value = result.data
}

const averageWithAccuracy = computed(() =>
  getAverageWithAccuracy(averageAccuracy.value)(dataset.value)
)

const randomErrorType = ref<RandomErrorType>('simple')
const changeRandomErrorType = (event: Event) => {
  randomErrorType.value = (event.target as HTMLInputElement).value as RandomErrorType
}

const randomErrorFull = computed(() => getRandomErrorFull(averageWithAccuracy.value)(dataset.value))
const randomErrorSimplified = computed(() =>
  getRandomErrorSimple(averageWithAccuracy.value)(dataset.value)
)

const systematicErrorSchema = z.number().nonnegative()
const systematicError = ref(0)

const setSystematicError = (event: Event) => {
  const target = event.target as HTMLInputElement
  try {
    const newValue = parseFloat((event.target as HTMLInputElement).value)
    systematicErrorSchema.parse(newValue)
    systematicError.value = newValue
  } catch (e) {
    systematicError.value = 0
    target.value = (0).toString()
  }
}

const fullError = computed(() =>
  randomErrorType.value === 'full'
    ? getFullError(randomErrorFull.value)(systematicError.value)
    : getFullError(randomErrorSimplified.value)(systematicError.value)
)
</script>

<template>
  <section class="">
    <section>
      <div class="flex justify-between gap-5">
        <span>Среднее значение</span>
        <span class="text-blue-500">{{ averageWithAccuracy }}</span>
      </div>
      <div class="group mt-3 flex justify-between gap-5">
        <span class="">Знаков после запятой</span>
        <BaseInput
          type="number"
          :value="averageAccuracy"
          min="1"
          max="5"
          class="h-fit w-[5ch] text-right group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"
          @change="setAverageAccuracy"
        />
      </div>
    </section>
    <section class="mt-10 flex flex-col gap-3">
      <span>Формула случайной погрешности</span>

      <div class="flex flex-wrap gap-3">
        <label class="w-full xs:w-auto">
          <input
            checked
            type="radio"
            name="random-error"
            value="simplified"
            class="peer hidden"
            @change="changeRandomErrorType"
          />
          <div
            class="w-full cursor-pointer rounded-xl border-2 border-transparent duration-300 hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-2.svg"
              alt=""
              class="mx-auto my-5 h-[60px] [user-select:none] dark:invert xs:m-3"
            />
          </div>
        </label>
        <label class="w-full xs:w-auto">
          <input
            type="radio"
            name="random-error"
            value="full"
            class="peer hidden"
            @change="changeRandomErrorType"
          />
          <div
            class="w-full cursor-pointer rounded-xl border-2 border-transparent duration-300 hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-1.svg"
              alt=""
              class="mx-auto my-5 h-[60px] w-max [user-select:none] dark:invert xs:m-3"
            />
          </div>
        </label>
      </div>
      <div class="flex justify-between gap-5">
        <span>Случайная погрешность</span>
        <span class="text-blue-500">{{
          randomErrorType === 'full' ? randomErrorFull : randomErrorSimplified
        }}</span>
      </div>
    </section>
    <section class="mt-10">
      <div class="group flex justify-between gap-5">
        <span class="">Систематическая погрешность</span>
        <BaseInput
          type="number"
          min="0"
          step="0.001"
          max="10"
          class="h-fit w-[7ch] text-right group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"
          :value="systematicError"
          @change="setSystematicError"
        />
      </div>
    </section>
    <section class="mt-10 flex flex-col gap-3">
      <span>Формула полной погрешности</span>
      <div
        class="w-full rounded-xl border-2 border-zinc-900 transition-colors dark:border-zinc-300 xs:w-fit"
      >
        <img
          src="@/assets/img/full-error.svg"
          alt=""
          class="mx-auto my-5 h-[50px] [user-select:none] dark:invert xs:m-3"
        />
      </div>
      <div class="flex justify-between gap-5">
        <span>Полная погрешность</span>
        <span class="text-green-600">{{ fullError }}</span>
      </div>
    </section>
  </section>
</template>
