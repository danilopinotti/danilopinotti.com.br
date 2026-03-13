<template>
  <div class="container px-5 pt-1 pb-12 mx-auto">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          Presentations
        </li>
      </ul>
    </div>
    <h1 class="text-2xl font-bold mb-4">
      Presentations
    </h1>
    <div class="mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div v-for="presentation in presentations" :key="presentation._path"
           class="mockup-window border border-base-300">
        <span class="absolute float w-full top-4 text-center font-bold text-gray-600">
          {{ truncateText(presentation.title) }}
        </span>
        <div class="flex flex-col justify-center px-4 border-t py-8 border-base-300">
          <NuxtLink :to="`/presentations/${getSlug(presentation._path)}`">
            <span class="text-2xl font-bold text-gray-600 hover:text-blue-700 title-font">
              {{ presentation.title }}
            </span>
            <div class="leading-relaxed">
              {{ truncateText(presentation.description, 100) }}
            </div>
          </NuxtLink>

          <div class="mt-2 text-sm font-light">
            <Icon name="fa6-regular:calendar" class="mr-1" />
            Data de publicação: {{ formatDate(presentation.publishedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { formatDate } = useFormatDate()

const { data: presentations } = await useAsyncData('presentations', () =>
  queryContent('/presentations')
    .only(['title', 'description', '_path', 'author', 'link', 'embed_link', 'publishedAt'])
    .sort({ publishedAt: -1 })
    .find()
)

function getSlug(path) {
  return path?.split('/').pop() || ''
}

function truncateText(text, length = 25) {
  if (!text || text.length <= length) return text
  return text.substring(0, length - 3) + '...'
}
</script>
