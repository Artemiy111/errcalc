<script setup lang="ts">
import { useDark } from '@vueuse/core'

defineEmits<{
  (e: 'toggle-darkmode'): void
}>()

const isDark = useDark()
</script>

<template>
  <header class="flex items-center justify-between gap-5">
    <h1 class="font-bold">Калькулятор погрешностей</h1>
    <Icon
      :icon="['far', isDark ? 'sun' : 'moon']"
      class="cursor-pointer text-2xl"
      @click="$emit('toggle-darkmode')"
    />
  </header>
</template>
