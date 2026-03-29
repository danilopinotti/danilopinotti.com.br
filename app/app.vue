<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { url: siteUrl } = useSiteConfig()

useHead({
  meta: [
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: `${siteUrl}/android-chrome-512x512.png` },
    { name: 'twitter:image', content: `${siteUrl}/android-chrome-512x512.png` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Danilo Pinotti',
            description: 'Site sobre tecnologia, programacao e ferramentas para desenvolvedores. Blog, apresentacoes tecnicas e ferramentas online gratuitas.',
            inLanguage: 'pt-BR',
            publisher: {
              '@id': `${siteUrl}/#person`,
            },
          },
          {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            name: 'Danilo Pinotti',
            url: siteUrl,
            jobTitle: 'Desenvolvedor Web Full-Stack',
            description: 'Desenvolvedor Web Fullstack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.',
            sameAs: [
              'https://github.com/danilopinotti',
              'https://www.linkedin.com/in/danilopinotti/',
              'https://twitter.com/danilopinotti',
            ],
            knowsAbout: [
              'Laravel', 'Vue.js', 'TailwindCSS', 'Docker', 'Git',
              'PHP', 'JavaScript', 'TypeScript', 'IoT', 'AWS',
            ],
          },
        ],
      }),
    },
  ],
})
</script>

