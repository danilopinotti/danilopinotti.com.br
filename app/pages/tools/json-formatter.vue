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
const tool = useTools().find(t => t.to === '/tools/json-formatter')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/json-formatter`
const title = 'Online JSON Formatter, Validator & Minifier'
const description = 'Format, validate and minify JSON online — free, private and entirely in your browser. Paste raw JSON, pretty-print with 2-space indentation, minify for transport or catch syntax errors instantly. No data is sent to any server.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'json formatter, json validator, json minifier, format json online, validate json, pretty print json, json beautifier, json lint, json parser, json checker, developer tool, free json tool' },
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
          'Format / pretty-print JSON with 2-space indentation',
          'Minify JSON for compact transport',
          'Real-time validation with inline error feedback',
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
