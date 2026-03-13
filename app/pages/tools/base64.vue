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

useHead({
  title: 'Base64 Encoder/Decoder',
  meta: [
    { name: 'description', content: 'Encode and decode strings to and from Base64 format online, directly in your browser.' },
    { property: 'og:title', content: 'Base64 Encoder/Decoder | Danilo Pinotti' },
    { property: 'og:description', content: 'Encode and decode strings to and from Base64 format online, directly in your browser.' },
    { property: 'og:url', content: 'https://danilopinotti.com.br/tools/base64' },
  ],
  link: [{ rel: 'canonical', href: 'https://danilopinotti.com.br/tools/base64' }],
})
</script>

<style scoped>

</style>
