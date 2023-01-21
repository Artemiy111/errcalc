<script setup lang="ts">
import { useDark } from '@vueuse/core'

defineEmits<{
  (e: 'toggle-darkmode'): void
}>()

const isDark = useDark()
</script>

<template>
  <header class="flex justify-between xs:gap-16">
    <h1 class="font-bold">Калькулятор погрешностей</h1>
    <div class="flex items-center gap-6 xs:gap-8">
      <a href="https://github.com/Artemiy111/error-calc" class="flex items-center text-center"
        ><Icon :icon="['fab', 'github']" class="cursor-pointer text-2xl"
      /></a>
      <Icon
        :icon="['far', isDark ? 'sun' : 'moon']"
        class="cursor-pointer text-2xl"
        @click="$emit('toggle-darkmode')"
      />
    </div>
  </header>
</template>
