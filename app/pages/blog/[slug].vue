<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mt-0 md:mt-8">
      <div class="flex flex-wrap justify-center">
        <article
          v-if="article"
          class="prose lg:prose-lg prose-slate prose-img:rounded-xl prose-pre:w-[300px] sm:prose-pre:w-[600px] md:prose-pre:w-full prose-pre:overflow-auto prose-a:text-blue-600 prose-headings:cursor-default prose-code:break-all md:prose-code:break-normal"
        >
          <ContentRenderer :value="article" />

          <span class="justify-self-end text-gray-500 text-sm">
            Data de publicação: {{ formatDate(article.publishedAt) }}
          </span>
          <br>
          <BlogAuthor :author="article.author" />
        </article>
      </div>
      <div v-if="surround">
        <BlogPrevNext :prev="surround[0]" :next="surround[1]" route-prefix="/blog" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const { formatDate } = useFormatDate()

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('articles').path(`/articles/${slug}`).first()
)

const { data: surround } = await useAsyncData(`article-surround-${slug}`, () =>
  queryCollectionItemSurroundings('articles', `/articles/${slug}`, {
    before: 1,
    after: 1,
  })
)

useHead(() => {
  if (!article.value) return {}

  const meta = [
    { name: 'description', content: article.value.description },
  ]

  if (article.value.keywords) {
    meta.push({ name: 'keywords', content: article.value.keywords })
  }

  return {
    title: article.value.title,
    meta,
  }
})
</script>
