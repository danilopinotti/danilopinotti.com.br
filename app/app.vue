<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://danilopinotti.com.br/#website',
            url: 'https://danilopinotti.com.br',
            name: 'Danilo Pinotti',
            description: 'Site sobre tecnologia, programacao e ferramentas para desenvolvedores. Blog, apresentacoes tecnicas e ferramentas online gratuitas.',
            inLanguage: 'pt-BR',
            publisher: {
              '@id': 'https://danilopinotti.com.br/#person',
            },
          },
          {
            '@type': 'Person',
            '@id': 'https://danilopinotti.com.br/#person',
            name: 'Danilo Pinotti',
            url: 'https://danilopinotti.com.br',
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

