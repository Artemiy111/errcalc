<script setup lang="ts">
const props = defineProps<{
  type: 'text' | 'number'
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const focus = () => {
  inputRef.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <input
    ref="inputRef"
    :type="props.type"
    class="appearance-none rounded-md bg-transparent outline-none duration-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-50 dark:hover:bg-zinc-800 dark:focus:ring-2 dark:focus:ring-zinc-800"
  />
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
