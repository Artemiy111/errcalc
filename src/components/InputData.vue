<script setup lang="ts">
import type { DataItem } from '@/types'
import { nanoid } from 'nanoid'

const props = defineProps<{
  modelValue: DataItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: DataItem[]): void
}>()

const addDataItem = (data: number | null = null) => {
  const newDataItem = {
    id: nanoid(),
    data,
  }
  emit('update:modelValue', [...props.modelValue, newDataItem])
}

const deleteDataItem = (id: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((dataItem) => dataItem.id !== id)
  )
}

const editDataItem = (event: Event, id: string) => {
  const newModelValue = [...props.modelValue]
  newModelValue.forEach((dataItem: DataItem, index) => {
    if (dataItem.id === id) newModelValue[index].data = +(event.target as HTMLInputElement).value
  })
  emit('update:modelValue', newModelValue)
}
</script>

<template>
  <section class="w-fit">
    <h4 class="whitespace-nowrap">Входные данные</h4>
    <template v-if="props.modelValue.length !== 0">
      <div
        class="mt-5 flex max-w-[220px] flex-col gap-2 rounded-xl border-2 border-zinc-900 px-3 pt-3 pb-2.5 dark:border-zinc-300"
      >
        <div v-for="(dataItem, index) in props.modelValue" :key="dataItem.id" class="">
          <div class="group flex flex-nowrap justify-between gap-4">
            <div class="flex gap-4">
              <span class="[user-select:none]">{{
                index + 1 <= 9 ? '0' + (index + 1) : index + 1
              }}</span>
              <input
                type="number"
                class="w-full appearance-none rounded-md bg-transparent px-1 outline-none duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-50 group-hover:bg-zinc-50 dark:focus:ring-2 dark:focus:ring-zinc-800 dark:group-hover:bg-zinc-800"
                :value="dataItem.data"
                @change="editDataItem($event, dataItem.id)"
              />
            </div>
            <button
              @click="deleteDataItem(dataItem.id)"
              class="flex aspect-square h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-zinc-900 opacity-0 transition-all duration-300 hover:bg-zinc-900 hover:text-white active:border-zinc-700 active:bg-zinc-700 active:text-white group-hover:opacity-100 dark:border-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-900 dark:active:border-zinc-100 dark:active:bg-zinc-100 dark:active:text-zinc-900 [@media(hover:none)]:opacity-100"
            >
              <span class="text-[26px] [user-select:none]">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <button
      @click="addDataItem()"
      class="mt-[10px] w-full rounded-full border-2 border-solid border-zinc-900 pt-[6px] pb-[5px] transition-colors [user-select:none] hover:bg-zinc-900 hover:text-white active:border-zinc-700 active:bg-zinc-700 active:text-white dark:border-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-900 dark:active:border-zinc-100 dark:active:bg-zinc-100 dark:active:text-zinc-900"
    >
      Добавить
    </button>
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
