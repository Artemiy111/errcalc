<script setup lang="ts">
import type { InputDatasetItem } from '@/components/TheMain.vue'

import { z } from 'zod'
import BaseButton from './BaseButton.vue'

import BaseInput from './BaseInput.vue'

const datasetItems = defineModel<InputDatasetItem[]>({ required: true })

const inputRefs = ref<Array<InstanceType<typeof BaseInput>>>([])

function focusOnLastInput() {
  inputRefs.value.at(-1)?.focus()
}

function addDataItem() {
  const newItem: InputDatasetItem = {
    id: crypto.randomUUID(),
    data: null,
  }
  datasetItems.value.push(newItem)
  nextTick(() => focusOnLastInput())
}

function deleteDataItem(id: string) {
  datasetItems.value = datasetItems.value.filter(dataItem => dataItem.id !== id)
}

const inputNumberSchema = z.number().min(-999_999).max(999_999)

function editDataItem(event: Event, id: string) {
  let newNumber: number | null = Number.parseFloat((event.target as HTMLInputElement).value)

  try {
    inputNumberSchema.parse(newNumber)
  }
  catch (_) {
    newNumber = null
    ;(event.target as HTMLInputElement).value = ''
  }

  datasetItems.value = datasetItems.value.map((dataItem) => {
    if (dataItem.id === id)
      dataItem.data = newNumber
    return dataItem
  })
}

const formatIndex = (index: number) => (index + 1 <= 9 ? `0${index + 1}` : index + 1)
</script>

<template>
  <section class="">
    <h2 class="whitespace-nowrap">
      Входные данные
    </h2>
    <template v-if="datasetItems.length !== 0">
      <div
        class="mt-5 flex  flex-col w-full gap-2 rounded-xl border-2 border-zinc-900 px-3 pt-3 pb-2.5 dark:border-zinc-300"
      >
        <div v-for="(dataItem, index) in datasetItems" :key="dataItem.id" class="">
          <div class="group flex flex-nowrap justify-between gap-4">
            <div class="flex w-full gap-4">
              <span class="[user-select:none]">{{ formatIndex(index) }}</span>
              <BaseInput
                ref="inputRefs"
                type="number"
                :value="dataItem.data"
                class="w-full group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"
                @change="editDataItem($event, dataItem.id)"
              />
            </div>
            <button
              class="flex aspect-square h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-zinc-900 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-zinc-900 hover:text-white active:border-zinc-700 active:bg-zinc-700 active:text-white dark:border-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-900 dark:active:border-zinc-100 dark:active:bg-zinc-100 dark:active:text-zinc-900 [@media(hover:none)]:opacity-100 [@media(pointer:coarse)]:opacity-100 [@media(pointer:none)]:opacity-100"
              @click="deleteDataItem(dataItem.id)"
            >
              <span class="text-[26px] [user-select:none]">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <BaseButton
      :class="datasetItems.length === 0 ? 'mt-5' : 'mt-3'"
      class="w-full"
      @click="addDataItem()"
    >
      Добавить
    </BaseButton>
  </section>
</template>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type='number']:hover,
input[type='number']:focus {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
