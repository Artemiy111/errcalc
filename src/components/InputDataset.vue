<script setup lang="ts">
import type { InputDatasetItem } from '@/components/TheMain.vue'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const props = defineProps<{
  modelValue: InputDatasetItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: InputDatasetItem[]): void
}>()

const addDataItem = () => {
  const newItem: InputDatasetItem = {
    id: nanoid(),
    data: null,
  }
  emit('update:modelValue', [...props.modelValue, newItem])
}

const deleteDataItem = (id: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((dataItem) => dataItem.id !== id)
  )
}

const inputNumberSchema = z.number().min(-999_999).max(999_999)

const editDataItem = (event: Event, id: string) => {
  let newNumber: number | null = parseFloat((event.target as HTMLInputElement).value)

  const newModelValue = [...props.modelValue]

  try {
    inputNumberSchema.parse(newNumber)
  } catch (e) {
    newNumber = null
    ;(event.target as HTMLInputElement).value = ''
  }

  newModelValue.forEach((dataItem: InputDatasetItem, index) => {
    if (dataItem.id === id) newModelValue[index].data = newNumber
  })
  emit('update:modelValue', newModelValue)
}

const formatIndex = (index: number) => (index + 1 <= 9 ? '0' + (index + 1) : index + 1)
</script>

<template>
  <section class="">
    <h2 class="whitespace-nowrap">Входные данные</h2>
    <template v-if="props.modelValue.length !== 0">
      <div
        class="mt-5 flex w-full flex-col gap-2 rounded-xl border-2 border-zinc-900 px-3 pt-3 pb-2.5 dark:border-zinc-300"
      >
        <div v-for="(dataItem, index) in props.modelValue" :key="dataItem.id" class="">
          <div class="group flex flex-nowrap justify-between gap-4">
            <div class="flex w-full gap-4">
              <span class="[user-select:none]">{{ formatIndex(index) }}</span>
              <BaseInput
                type="number"
                :value="dataItem.data"
                class="w-full group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800"
                @change="editDataItem($event, dataItem.id)"
              />
            </div>
            <button
              class="flex aspect-square h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-zinc-900 opacity-0 transition-all duration-300 hover:bg-zinc-900 hover:text-white active:border-zinc-700 active:bg-zinc-700 active:text-white group-hover:opacity-100 dark:border-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-900 dark:active:border-zinc-100 dark:active:bg-zinc-100 dark:active:text-zinc-900 [@media(hover:none)]:opacity-100 [@media(pointer:none)]:opacity-100 [@media(pointer:coarse)]:opacity-100"
              @click="deleteDataItem(dataItem.id)"
            >
              <span class="text-[26px] [user-select:none]">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <BaseButton
      :class="props.modelValue.length === 0 ? 'mt-5' : 'mt-3'"
      class="w-full"
      @click="addDataItem()"
      >Добавить</BaseButton
    >
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
