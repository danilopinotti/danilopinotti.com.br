<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Presentations' }]" />
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

const { data: presentations } = await useAsyncData('presentations', () =>
  queryCollection('presentations')
    .select('title', 'description', 'path', 'publishedAt')
    .order('publishedAt', 'DESC')
    .all()
)

function getSlug(path) {
  return path?.split('/').pop() || ''
}
</script>
