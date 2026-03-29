<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'Base64 Encoder/Decoder', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">
        Base64 Encoder/Decoder
      </h1>

      <ToolsBase64EncoderDecoder/>
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/base64')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/base64`
const description = 'Encode and decode strings to and from Base64 format online, directly in your browser. Free Base64 encoder and decoder tool.'

useHead({
  title: 'Base64 Encoder/Decoder',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'base64, base64 encode, base64 decode, online base64, base64 converter, free base64 tool' },
    { property: 'og:title', content: 'Base64 Encoder/Decoder | Danilo Pinotti' },
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
        name: 'Base64 Encoder/Decoder',
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

<style scoped>

</style>
