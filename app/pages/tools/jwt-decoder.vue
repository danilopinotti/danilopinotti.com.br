<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'JWT Decoder', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">JWT Decoder</h1>

      <ToolsJwtDecoder />
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/jwt-decoder')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/jwt-decoder`
const description = 'Decode JWT header and payload online in your browser. Free JWT decoder tool for inspecting JSON Web Tokens without sending them to a server.'

useHead({
  title: 'JWT Decoder',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'jwt decoder, json web token decoder, decode jwt online, jwt header payload, developer tool' },
    { property: 'og:title', content: 'JWT Decoder | Danilo Pinotti' },
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
        name: 'JWT Decoder',
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
