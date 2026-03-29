<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'UUID Generator', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">UUID Generator</h1>

      <ToolsUuidGenerator />
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/uuid-generator')
const siteUrl = 'https://danilopinotti.com.br'
const pageUrl = `${siteUrl}/tools/uuid-generator`
const description = 'Generate UUIDs in versions 4, 5 and 7 instantly, directly in your browser. Free online UUID generator tool.'

useHead({
  title: 'UUID Generator',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'uuid, uuid generator, uuid v4, uuid v5, uuid v7, online uuid, free uuid generator' },
    { property: 'og:title', content: 'UUID Generator | Danilo Pinotti' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'UUID Generator',
        description,
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
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

