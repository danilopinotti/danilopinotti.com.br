<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="-my-8 divide-y-2 divide-gray-100">
        <div v-for="article of articles" :key="article.slug" class="py-8 flex flex-wrap md:flex-nowrap">
          <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span class="mt-1 text-gray-500 text-sm">
              {{ $formatDate(article.publishedAt) }}
            </span>
          </div>
          <div class="md:flex-grow">
            <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }" class="text-2xl font-medium text-gray-900 title-font mb-2">{{article.title}}</NuxtLink>
            <p class="leading-relaxed">{{article.description}}</p>
            <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }"
                      class="text-indigo-500 inline-flex items-center mt-4">
              Leia Mais
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({$content, params}) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author', 'publishedAt'])
      .sortBy('publishedAt', 'desc')
      .fetch()

    return {
      articles
    }
  }
}
</script>
