<script setup lang="ts">
const props = defineProps<{ isDark: boolean }>()

const emit = defineEmits<{
  'toggle:darkmode': []
}>()
</script>

<template>
  <header class="xs:gap-8 flex justify-between gap-4">
    <h1 class="font-bold">Калькулятор погрешностей</h1>
    <div class="flex items-center gap-5 sm:gap-6 md:gap-8">
      <a href="https://github.com/Artemiy111/error-calc" class="flex items-center text-center"
        ><Icon :icon="['fab', 'github']" class="cursor-pointer text-2xl"
      /></a>
      <Icon
        :icon="['far', props.isDark ? 'sun' : 'moon']"
        class="cursor-pointer text-2xl"
        @click="emit('toggle:darkmode')"
      />
    </div>
  </header>
</template>
