<template>
  <nav aria-label="Breadcrumb" class="text-sm breadcrumbs">
    <ol class="flex items-center flex-wrap gap-1">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="flex items-center gap-1 hover:text-blue-700 transition-colors"
        >
          <Icon v-if="resolveIcon(item)" :name="resolveIcon(item)" size="14" class="shrink-0 mr-1" />
          {{ item.label }}
        </NuxtLink>
        <span v-else class="flex items-center gap-1 text-gray-500" aria-current="page">
          <Icon v-if="resolveIcon(item)" :name="resolveIcon(item)" size="14" class="shrink-0 mr-1" />
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Home', to: '/' }, { label: 'Tools', icon: 'fa6-solid:screwdriver-wrench' }]
  }
})

const siteUrl = 'https://danilopinotti.com.br'

const breadcrumbJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: props.items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.to ? { item: `${siteUrl}${item.to}` } : {}),
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(breadcrumbJsonLd.value)),
    },
  ],
})

function resolveIcon(item) {
  if (item.icon) return item.icon
  if (item.to === '/' || item.label === 'Home') return 'heroicons:home'
  return null
}
</script>
