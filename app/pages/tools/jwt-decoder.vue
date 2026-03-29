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
const title = 'Online JWT Decoder — Inspect Header, Payload & Claims'
const description = 'Decode JSON Web Tokens (JWT) instantly in your browser — no data leaves your machine. Inspect the Base64URL-encoded header, payload claims (sub, iss, exp, iat) and signature. Free, private and open-source.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'jwt decoder, jwt debugger, decode jwt online, json web token decoder, jwt inspector, jwt header payload, jwt claims viewer, jwt signature, jwt parser, jwt tool, developer tool, free jwt decoder' },
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
          'Decode JWT header and payload from Base64URL',
          'Inspect standard claims (sub, iss, aud, iat, exp)',
          'Display signature segment for reference',
          'Real-time decoding as you type or paste',
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
