<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const cssColorScheme = computed(() => (isDark.value ? 'dark' : 'light'))

watchEffect(() => {
  document.documentElement.style.colorScheme = cssColorScheme.value
})
</script>

<template>
  <header class="flex items-center justify-between gap-5">
    <h1 class="font-bold">Калькулятор погрешностей</h1>
    <Icon
      :icon="['far', isDark ? 'sun' : 'moon']"
      class="cursor-pointer text-2xl"
      @click="toggleDark()"
    />
  </header>
</template>
