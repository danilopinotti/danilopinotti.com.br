<template>
  <section class="text-gray-600 body-font overflow-hidden antialiased">
    <div class="container px-6 md:px-28 py-6 mx-auto">
      <div class="flex flex-wrap gap-2">
        <div class="p-6 flex flex-col items-start rounded-lg" v-for="article of articles" :key="article.slug">
          <div class="flex gap-2">
            <SharedTag v-for="tag in article.tags?.split(',') || []" :tag="tag" :key="tag"></SharedTag>
          </div>
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }"
                    class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
            {{ article.title }}
          </NuxtLink>
          <p class="leading-relaxed mb-4">
            {{ article.description }}
          </p>
          <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
            <NuxtLink
              :to="{ name: 'blog-slug', params: { slug: article.slug } }"
              class="text-indigo-500 inline-flex items-center">
              Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
            <span
              class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-gray-200">
              Published at: {{ $formatDate(article.publishedAt) }}
            </span>
          </div>
          <BlogAuthor :author="article.author" class=""/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({$content, params}) {
    const articles = await $content('articles')
      .only(['title', 'description', 'image', 'slug', 'author', 'publishedAt', 'tags'])
      .sortBy('publishedAt', 'desc')
      .fetch()

    return {
      articles
    }
  }
}
</script>
