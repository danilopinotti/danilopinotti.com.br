<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mt-0 md:mt-8">
      <div class="flex flex-wrap justify-center">
        <article
          v-if="article"
          class="prose lg:prose-lg prose-slate prose-img:rounded-xl prose-pre:w-[300px] sm:prose-pre:w-[600px] md:prose-pre:w-full prose-pre:overflow-auto prose-a:text-blue-600 prose-code:break-all md:prose-code:break-normal"
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
const { url: siteUrl } = useSiteConfig()

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

  const pageUrl = `${siteUrl}/blog/${slug}`
  const image = article.value.image
    ? (article.value.image.startsWith('http') ? article.value.image : `${siteUrl}${article.value.image}`)
    : `${siteUrl}/android-chrome-512x512.png`

  const meta = [
    { name: 'description', content: article.value.description },
    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:title', content: article.value.title },
    { property: 'og:description', content: article.value.description },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'article:published_time', content: article.value.publishedAt },
    { property: 'article:author', content: article.value.author?.name || 'Danilo Pinotti' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.value.title },
    { name: 'twitter:description', content: article.value.description },
    { name: 'twitter:image', content: image },
  ]

  if (article.value.tags) {
    article.value.tags.split(',').forEach((tag) => {
      meta.push({ property: 'article:tag', content: tag.trim() })
    })
  }

  if (article.value.keywords) {
    meta.push({ name: 'keywords', content: article.value.keywords })
  }

  const jsonLd = {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.value.title,
      description: article.value.description,
      image,
      datePublished: article.value.publishedAt,
      inLanguage: 'pt-BR',
      author: {
        '@type': 'Person',
        name: article.value.author?.name || 'Danilo Pinotti',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Person',
        name: 'Danilo Pinotti',
        url: siteUrl,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['article h1', 'article h2', 'article p'],
      },
      isAccessibleForFree: true,
    }),
  }

  return {
    title: article.value.title,
    meta,
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [jsonLd],
  }
})
</script>
