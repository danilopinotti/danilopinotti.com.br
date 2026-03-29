<template>
  <div class="flex items-center gap-3 mb-8">
    <component :is="tag" class="text-sm font-semibold uppercase tracking-widest text-gray-400">{{ title }}</component>
    <div class="flex-1 h-px bg-gray-100"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'h1',
  },
})
</script>

