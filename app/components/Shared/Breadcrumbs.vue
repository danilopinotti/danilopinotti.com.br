<template>
  <div class="text-sm breadcrumbs">
    <ul class="flex items-center flex-wrap gap-1">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="flex items-center gap-1 hover:text-blue-700 transition-colors"
        >
          <Icon v-if="resolveIcon(item)" :name="resolveIcon(item)" size="14" class="shrink-0 mr-1" />
          {{ item.label }}
        </NuxtLink>
        <span v-else class="flex items-center gap-1 text-gray-500">
          <Icon v-if="resolveIcon(item)" :name="resolveIcon(item)" size="14" class="shrink-0 mr-1" />
          {{ item.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Home', to: '/' }, { label: 'Tools', icon: 'fa6-solid:screwdriver-wrench' }]
  }
})

function resolveIcon(item) {
  if (item.icon) return item.icon
  if (item.to === '/' || item.label === 'Home') return 'heroicons:home'
  return null
}
</script>
