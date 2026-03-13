<template>
  <div class="flex items-center gap-3 mb-8">
    <span class="text-sm font-semibold uppercase tracking-widest text-gray-400">{{ title }}</span>
    <div class="flex-1 h-px bg-gray-100"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  }
})
</script>

