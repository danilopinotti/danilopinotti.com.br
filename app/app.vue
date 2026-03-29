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
            description: 'Personal website of Danilo Pinotti with articles, talks, and developer tools focused on backend engineering, software architecture, and distributed systems.',
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
            jobTitle: 'Senior Backend Developer and Software Architect',
            description: 'Senior Backend Developer and Software Architect with more than 10 years of experience in distributed systems, payments, observability, and high-reliability web applications.',
            sameAs: [
              'https://github.com/danilopinotti',
              'https://www.linkedin.com/in/danilopinotti/',
              'https://twitter.com/danilopinotti',
            ],
            knowsAbout: [
              'Backend Engineering', 'Software Architecture', 'Distributed Systems', 'Payment Integrations', 'Observability',
              'Laravel', 'Node.js', 'NestJS', 'PHP', 'TypeScript',
              'PostgreSQL', 'Redis', 'Docker', 'AWS',
            ],
          },
        ],
      }),
    },
  ],
})
</script>
