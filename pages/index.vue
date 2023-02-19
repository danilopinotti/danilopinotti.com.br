<template>
  <section class="text-gray-600 body-font overflow-hidden antialiased">
    <div class="container px-6 md:px-28 py-6 mx-auto">
      <div class="flex flex-wrap gap-2">
        <div class="px-6 flex flex-col items-start border-b py-6" v-for="article of articles" :key="article.slug">
          <div class="flex gap-2 mx-auto md:mx-0 mb-4 md:mb-2">
            <SharedTag v-for="tag in article.tags?.split(',') || []" :tag="tag" :key="tag"></SharedTag>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-full order-2 md:order-1 mb-3"
              :class="{'md:w-2/3': article.image}">
              <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }"
                        class="sm:text-3xl text-2xl title-font font-medium text-gray-900 my-4">
                {{ article.title }}
              </NuxtLink>
              <p class="leading-relaxed mb-4">
                {{ article.description }}
              </p>
            </div>
            <div class="w-full md:w-1/3 flex justify-center md:justify-end p-0 order-1 md:order-2" v-if="article.image">
              <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
                <img :src="article.image" class="h-auto md:h-32 w-full md:w-auto mb-4 md:mb-0" :alt="article.title">
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center flex-wrap border-gray-100 mt-auto w-full">
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
