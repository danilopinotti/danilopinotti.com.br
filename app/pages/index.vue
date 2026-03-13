<template>
  <section class="text-gray-600 body-font antialiased">
    <div class="container px-6 md:px-16 py-10 mx-auto">
      <SharedSectionTitle title="Blog" />
      <div class="grid grid-cols-1 gap-6">
        <NuxtLink
          v-for="article of articles"
          :key="article.path"
          :to="`/blog/${getSlug(article.path)}`"
          class="group flex flex-col md:flex-row rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden bg-white"
        >
          <!-- Image -->
          <div class="overflow-hidden md:w-56 shrink-0 order-first md:order-last">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="article.title"
              class="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              v-else
              class="w-full h-48 md:h-full bg-gradient-to-br from-slate-100 to-sky-50 flex items-center justify-center"
            >
              <Icon name="heroicons:document-text" size="56" class="text-slate-300" />
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 p-5">
            <!-- Tags -->
            <div v-if="article.tags" class="flex flex-wrap gap-1.5 mb-3">
              <SharedTag
                v-for="tag in article.tags.split(',')"
                :tag="tag.trim()"
                :key="tag"
              />
            </div>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors duration-150 mb-2 leading-snug">
              {{ article.title }}
            </h2>

            <!-- Description -->
            <p class="text-gray-500 text-base leading-relaxed line-clamp-3 flex-1">
              {{ article.description }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span class="text-sm text-gray-400 flex items-center gap-1.5">
                <Icon name="fa6-regular:calendar" size="15" />
                {{ formatDate(article.publishedAt) }}
              </span>
              <span class="text-sky-600 text-base font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
                Read more
                <Icon name="heroicons:arrow-right" size="18" />
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

useHead({
  title: 'Blog',
  link: [{ rel: 'canonical', href: 'https://danilopinotti.com.br' }],
  meta: [
    { property: 'og:url', content: 'https://danilopinotti.com.br' },
  ],
})

const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles')
    .select('title', 'description', 'image', 'path', 'publishedAt', 'tags')
    .order('publishedAt', 'DESC')
    .all()
)

function getSlug(path) {
  return path?.split('/').pop() || ''
}
</script>
