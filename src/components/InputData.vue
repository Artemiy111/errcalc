<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { DataItem } from '@/../types'

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
    props.modelValue.filter(dataItem => dataItem.id !== id)
  )
}

const editDataItem = (event: Event, id: string) => {
  const newModelValue = [...props.modelValue]
  newModelValue.forEach((dataItem: DataItem, index) => {
    if (dataItem.id === id)
      newModelValue[index].data = +(event.target as HTMLInputElement).value
  })
  emit('update:modelValue', newModelValue)
}
</script>

<template>
  <section class="w-fit">
    <h4 class="whitespace-nowrap">Входные данные</h4>
    <template v-if="props.modelValue.length !== 0">
      <div
        class="flex flex-col gap-2 mt-5 border-2 border-black rounded-xl pt-3 pb-2.5 px-3 max-w-[220px]"
      >
        <div
          v-for="(dataItem, index) in props.modelValue"
          :key="dataItem.id"
          class=""
        >
          <div class="flex flex-nowrap gap-4 justify-between group">
            <div class="flex gap-4">
              <span>{{ index + 1 <= 9 ? '0' + (index + 1) : index + 1 }}</span>
              <input
                type="number"
                class="w-full focus:outline-none appearance-none group-hover:bg-slate-50 rounded-md px-1"
                :value="dataItem.data"
                @change="editDataItem($event, dataItem.id)"
              />
            </div>

            <button
              @click="deleteDataItem(dataItem.id)"
              class="group-hover:opacity-100 opacity-0 w-[26px] h-[26px] aspect-square border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
            >
              <span class="text-[26px]">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <button
      @click="addDataItem()"
      class="mt-[10px] pt-[6px] pb-[5px] w-full border-2 border-solid border-black rounded-full hover:bg-black hover:text-white transition"
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
