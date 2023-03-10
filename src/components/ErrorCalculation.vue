<script setup lang="ts">
import useAverage from '@/composables/useAverage'
import useRandomError, { type RandomErrorFormula } from '@/composables/useRandomError'
import customRounded from '@/helpers/customRounded'

import { z } from 'zod'

const props = defineProps<{
  dataset: number[]
}>()

const dataset = toRef(props, 'dataset')

const average = useAverage(dataset)

const decimalPlacesSchema = z.number().int().min(1).max(5)
const decimalPlaces = ref(3)

const setDecimalPlaces = (event: Event) => {
  const newValue = parseFloat((event.target as HTMLInputElement).value)
  try {
    decimalPlacesSchema.parse(newValue)
    console.log('parse ' + newValue)
    decimalPlaces.value = newValue
  } catch (e) {
    decimalPlaces.value = 3
    ;(event.target as HTMLInputElement).value = String(3)
  }
}

const formatedAverage = computed<number>(() => +average.value.toFixed(decimalPlaces.value))

const randomErrorFormula = ref<RandomErrorFormula>('full')

const changeRandomErrorFormula = (event: Event) => {
  const value = (event.target as HTMLInputElement).value as RandomErrorFormula
  randomErrorFormula.value = value
}

const randomErrorFull = useRandomError(average, dataset, 'full')
const randomErrorSimplified = useRandomError(average, dataset, 'simplified')

const systematicErrorSchema = z.number().nonnegative()
const systematicError = ref(0)

const setSystematicError = (event: Event) => {
  try {
    const newValue = parseFloat((event.target as HTMLInputElement).value)
    systematicErrorSchema.parse(newValue)
    systematicError.value = newValue
  } catch (e) {
    systematicError.value = 0
    ;(event.target as HTMLInputElement).value = String(0)
  }
}

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
      <div class="flex justify-between gap-5">
        <span>?????????????? ????????????????</span>
        <span class="text-blue-500">{{ formatedAverage }}</span>
      </div>
      <div class="group mt-3 flex justify-between gap-5">
        <span class="">???????????? ?????????? ??????????????</span>
        <BaseInput
          type="number"
          :value="decimalPlaces"
          min="1"
          max="5"
          class="h-fit w-[5ch] text-right group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"
          @change="setDecimalPlaces"
        />
      </div>
    </section>
    <section class="mt-10 flex flex-col gap-3">
      <span>?????????????? ?????????????????? ??????????????????????</span>

      <div class="flex flex-wrap gap-3">
        <label class="w-full xs:w-auto">
          <input
            type="radio"
            name="random-error"
            value="full"
            checked
            class="peer hidden"
            @change="changeRandomErrorFormula"
          />
          <div
            class="w-full cursor-pointer rounded-xl border-2 border-transparent duration-300 hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-1.svg"
              alt=""
              class="my-5 mx-auto h-[60px] w-max [user-select:none] dark:invert xs:m-3"
            />
          </div>
        </label>
        <label class="w-full xs:w-auto">
          <input
            type="radio"
            name="random-error"
            value="simplified"
            class="peer hidden"
            @change="changeRandomErrorFormula"
          />
          <div
            class="w-full cursor-pointer rounded-xl border-2 border-transparent duration-300 hover:bg-zinc-50 active:ring-2 active:ring-zinc-50 peer-checked:cursor-auto peer-checked:border-zinc-900 peer-checked:hover:bg-transparent dark:hover:bg-zinc-800 dark:active:ring-2 dark:active:ring-zinc-800 dark:peer-checked:border-zinc-300"
          >
            <img
              src="@/assets/img/random-error-2.svg"
              alt=""
              class="my-5 mx-auto h-[60px] [user-select:none] dark:invert xs:m-3"
            />
          </div>
        </label>
      </div>
      <div class="flex justify-between gap-5">
        <span>?????????????????? ??????????????????????</span>
        <span class="text-blue-500">{{
          randomErrorFormula === 'full' ? randomErrorFull : randomErrorSimplified
        }}</span>
      </div>
    </section>
    <section class="mt-10">
      <div class="group flex justify-between gap-5">
        <span class="">?????????????????????????????? ??????????????????????</span>
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
      <span>?????????????? ???????????? ??????????????????????</span>
      <div
        class="w-full rounded-xl border-2 border-zinc-900 transition-colors dark:border-zinc-300 xs:w-fit"
      >
        <img
          src="@/assets/img/full-error.svg"
          alt=""
          class="my-5 mx-auto h-[50px] [user-select:none] dark:invert xs:m-3"
        />
      </div>
      <div class="flex justify-between gap-5">
        <span>???????????? ??????????????????????</span>
        <span class="text-green-600">{{ formatedFullError }}</span>
      </div>
    </section>
  </section>
</template>
