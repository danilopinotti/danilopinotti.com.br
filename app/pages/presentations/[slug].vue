<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto" v-if="presentation">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Presentations', to: '/presentations', icon: 'fa6-solid:chalkboard-user' }, { label: presentation.title }]" />

      <h1 class="text-2xl font-bold text-gray-800 mb-6">{{ presentation.title }}</h1>

      <!-- Side by side layout -->
      <div class="flex flex-col lg:flex-row gap-8 items-start">

        <!-- Iframe (left) -->
        <div class="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
          <iframe
            :src="presentation.embed_link"
            width="100%"
            height="485"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            allowfullscreen
          />
        </div>

        <!-- Meta (right) -->
        <div class="w-full lg:w-72 shrink-0 flex flex-col gap-5">
          <p v-if="presentation.description" class="text-gray-600 leading-relaxed">
            {{ presentation.description }}
          </p>

          <div class="flex flex-col gap-2 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <Icon name="fa6-regular:calendar" size="14" />
              {{ formatDate(presentation.publishedAt) }}
            </span>
            <a
              :href="presentation.link"
              class="flex items-center gap-1.5 text-sky-600 hover:text-sky-800 font-medium transition-colors duration-150"
              title="Open external link"
              target="_blank"
            >
              <Icon name="fa6-solid:arrow-up-right-from-square" size="13" />
              Open external link
            </a>
          </div>

          <BlogAuthor :author="presentation.author" />
        </div>
      </div>

      <BlogPrevNext route-prefix="/presentations" :prev="surround?.[0]" :next="surround?.[1]" class="mt-8" />
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const { formatDate } = useFormatDate()
const { url: siteUrl } = useSiteConfig()

const { data: presentation } = await useAsyncData(`presentation-${slug}`, () =>
  queryCollection('presentations').path(`/presentations/${slug}`).first()
)

const { data: surround } = await useAsyncData(`presentation-surround-${slug}`, () =>
  queryCollectionItemSurroundings('presentations', `/presentations/${slug}`, {
    before: 1,
    after: 1,
  })
)

useHead(() => {
  if (!presentation.value) return {}

  const pageUrl = `${siteUrl}/presentations/${slug}`

  const meta = [
    { name: 'description', content: presentation.value.description },
    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:title', content: presentation.value.title },
    { property: 'og:description', content: presentation.value.description },
    { property: 'og:image', content: `${siteUrl}/android-chrome-512x512.png` },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'article:published_time', content: presentation.value.publishedAt },
    { property: 'article:author', content: presentation.value.author?.name || 'Danilo Pinotti' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: presentation.value.title },
    { name: 'twitter:description', content: presentation.value.description },
    { name: 'twitter:image', content: `${siteUrl}/android-chrome-512x512.png` },
  ]

  if (presentation.value.keywords) {
    meta.push({ name: 'keywords', content: presentation.value.keywords })
  }

  const jsonLd = {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'PresentationDigitalDocument',
      name: presentation.value.title,
      description: presentation.value.description,
      datePublished: presentation.value.publishedAt,
      url: pageUrl,
      author: {
        '@type': 'Person',
        name: presentation.value.author?.name || 'Danilo Pinotti',
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
    }),
  }

  return {
    title: presentation.value.title,
    meta,
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [jsonLd],
  }
})
</script>
