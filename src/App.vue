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
  <div class="container mx-auto mt-10 mb-10 px-5 transition-all">
    <TheHeader class="" @toggle-darkmode="toggleDark" />
    <TheMain class="mt-10 flex flex-col flex-nowrap gap-x-20 gap-y-10 md:flex-row"> </TheMain>
  </div>
</template>
