<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'Document Generator (CPF and CNPJ)', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">
        Document Generator (CPF and CNPJ)
      </h1>

      <ToolsDocumentGenerator/>
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/document-generator')
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/document-generator`
const description = 'Gere CPF e CNPJ validos para testes de software de forma rapida e simples. Ferramenta online gratuita para gerar e validar documentos brasileiros.'

useHead({
  title: 'Document Generator (CPF and CNPJ)',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'cpf, cnpj, gerador cpf, gerador cnpj, validar cpf, validar cnpj, documento brasileiro, cpf generator, cnpj generator' },
    { property: 'og:title', content: 'Document Generator (CPF and CNPJ) | Danilo Pinotti' },
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
        name: 'Document Generator (CPF and CNPJ)',
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
