<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { FilteredDataItem, RandomErrorFormula } from '@/../types'
import { useAverage } from '@/composables/useAverage'
import { useRandomError } from '@/composables/useRandomError'
import { customRounded } from '@/utils/customRounded'

const props = defineProps<{
  dataset: FilteredDataItem[]
}>()

const dataset = toRef(props, 'dataset')

const average = useAverage(dataset)
const decimalPlaces = ref(3)
const formatedAverage = computed<number>(
  () => +average.value.toFixed(decimalPlaces.value)
)

const randomErrorFormula = ref<RandomErrorFormula>('full')

const changeRandomErrorFormula = (event: Event) => {
  const value = (event.target as HTMLInputElement).value as RandomErrorFormula
  randomErrorFormula.value = value
}

const randomErrorFull = useRandomError(average, dataset, 'full')
const randomErrorSimplified = useRandomError(average, dataset, 'simplified')

const systematicError = ref(0)

const fullError = computed<number>(() => {
  return randomErrorFormula.value === 'full'
    ? (randomErrorFull.value ** 2 + systematicError.value ** 2) ** 0.5
    : (randomErrorSimplified.value ** 2 + systematicError.value ** 2) ** 0.5
})

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
        <span class="whitespace-nowrap w-fit">Знаков после запятой</span>
        <input
          type="number"
          v-model.number="decimalPlaces"
          min="1"
          max="9"
          class="w-full font-bold outline-none group-hover:bg-slate-50 rounded-md transition"
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
            class="w-fit rounded-xl peer-checked:border-black hover:bg-slate-50 border-2 border-transparent transition"
          >
            <img
              src="@/assets/img/random-error-1.svg"
              alt=""
              class="h-[60px] w-max m-3 cursor-pointer"
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
            class="rounded-xl peer-checked:border-black hover:bg-slate-50 border-2 border-transparent transition"
          >
            <img
              src="@/assets/img/random-error-2.svg"
              alt=""
              class="h-[60px] m-3 cursor-pointer"
            />
          </div>
        </label>
      </div>
      <div class="flex gap-5">
        <span>Случайная погрешность</span>
        <span class="text-blue-500">{{
          randomErrorFormula === 'full'
            ? randomErrorFull
            : randomErrorSimplified
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
          class="w-full font-bold outline-none group-hover:bg-slate-50 rounded-md transition"
        />
      </div>
    </section>
    <section class="mt-10 mb-10 flex flex-col gap-3">
      <span>Формула полной погрешности</span>
      <div class="rounded-xl border-2 border-black w-fit">
        <img src="@/assets/img/full-error.svg" alt="" class="h-[50px] m-3" />
      </div>
      <div class="flex gap-5">
        <span>Полная погрешность</span>
        <span class="text-green-600">{{ formatedFullError }}</span>
      </div>
    </section>
  </section>
</template>
