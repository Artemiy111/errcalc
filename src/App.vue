<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheMain from '@/components/TheMain.vue'

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const cssColorScheme = computed(() => (isDark.value ? 'dark' : 'light'))

watchEffect(() => {
  document.documentElement.style.colorScheme = cssColorScheme.value
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <div class="container mx-auto mt-10 mb-10 px-5 transition-all">
    <TheHeader :is-dark="isDark" @toggle:darkmode="toggleDark" />
    <TheMain class="mt-10" />
  </div>
</template>
