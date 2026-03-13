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

useHead({
  title: 'UUID Generator',
  meta: [
    { name: 'description', content: 'Generate UUIDs in versions 4, 5 and 7 instantly, directly in your browser.' },
    { property: 'og:title', content: 'UUID Generator | Danilo Pinotti' },
    { property: 'og:description', content: 'Generate UUIDs in versions 4, 5 and 7 instantly, directly in your browser.' },
    { property: 'og:url', content: 'https://danilopinotti.com.br/tools/uuid-generator' },
  ],
  link: [{ rel: 'canonical', href: 'https://danilopinotti.com.br/tools/uuid-generator' }],
})
</script>

