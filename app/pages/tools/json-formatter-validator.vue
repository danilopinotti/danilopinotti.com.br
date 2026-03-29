<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'JSON Formatter/Validator', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">JSON Formatter/Validator</h1>

      <ToolsJsonFormatterValidator />
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/json-formatter-validator')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/json-formatter-validator`
const description = 'Format, validate and minify JSON online, directly in your browser. Free JSON formatter and validator tool for developers.'

useHead({
  title: 'JSON Formatter/Validator',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'json formatter, json validator, json minifier, format json online, validate json, developer tool' },
    { property: 'og:title', content: 'JSON Formatter/Validator | Danilo Pinotti' },
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
        name: 'JSON Formatter/Validator',
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
