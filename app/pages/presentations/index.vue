<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Presentations', icon: 'fa6-solid:chalkboard-user' }]" />
      <h1 class="text-2xl font-bold mb-8">Presentations</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <NuxtLink
          v-for="presentation in presentations"
          :key="presentation.path"
          :to="`/presentations/${getSlug(presentation.path)}`"
          class="group flex flex-col rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white transition-all duration-200 overflow-hidden"
        >
          <!-- Thumbnail -->
          <div class="w-full h-36 bg-gradient-to-br from-slate-100 to-sky-50 flex items-center justify-center">
            <Icon
              name="heroicons:presentation-chart-bar"
              size="52"
              class="text-slate-300 group-hover:text-sky-400 transition-colors duration-200"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 p-4">
            <h2 class="text-base font-bold text-gray-800 group-hover:text-blue-800 transition-colors duration-150 mb-1 leading-snug line-clamp-2">
              {{ presentation.title }}
            </h2>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
              {{ presentation.description }}
            </p>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span class="text-xs text-gray-400 flex items-center gap-1.5">
                <Icon name="fa6-regular:calendar" size="12" />
                {{ formatDate(presentation.publishedAt) }}
              </span>
              <span class="text-sky-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
                View
                <Icon name="heroicons:arrow-right" size="14" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { formatDate } = useFormatDate()
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/presentations`
const description = 'Technical talks and presentations on backend engineering, software architecture, distributed systems, Laravel, Git, and automated testing.'

useHead({
  title: 'Presentations',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'Danilo Pinotti presentations, backend engineering talks, software architecture talks, distributed systems, Laravel, Git, automated testing, developer presentations' },
    { property: 'og:title', content: 'Presentations | Danilo Pinotti' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
})

const { data: presentations } = await useAsyncData('presentations', () =>
  queryCollection('presentations')
    .select('title', 'description', 'path', 'publishedAt')
    .order('publishedAt', 'DESC')
    .all()
)

// JSON-LD for presentations listing (added after data is loaded)
useHead(() => {
  if (!presentations.value?.length) return {}

  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Presentations',
          description,
          url: pageUrl,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: presentations.value.map((p, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: p.title,
              url: `${siteUrl}/presentations/${getSlug(p.path)}`,
            })),
          },
        }),
      },
    ],
  }
})

function getSlug(path) {
  return path?.split('/').pop() || ''
}
</script>
