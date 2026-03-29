<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'JSONPath Builder', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">JSONPath Builder</h1>

      <ToolsJsonPathBuilder />
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/jsonpath-builder')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/jsonpath-builder`
const title = 'JSONPath Builder — Interactive JSONPath Expression Generator'
const description = 'Paste JSON and click on any element to instantly get its JSONPath expression. Build JSONPath queries visually without memorizing syntax. Free, private, runs entirely in your browser.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'jsonpath, jsonpath builder, jsonpath generator, jsonpath expression, json path finder, json query builder, jsonpath online, jsonpath tool, json navigator, developer tool, free jsonpath tool' },
    { property: 'og:title', content: `${title} | Danilo Pinotti` },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `${title} | Danilo Pinotti` },
    { name: 'twitter:description', content: description },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description,
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        inLanguage: 'en',
        browserRequirements: 'Requires JavaScript',
        featureList: [
          'Visual JSONPath expression builder',
          'Click any JSON element to get its path',
          'Syntax-highlighted interactive JSON tree',
          'Works entirely in the browser — no server requests',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Person',
          name: 'Danilo Pinotti',
          url: siteUrl,
        },
      }),
    },
  ],
})
</script>
