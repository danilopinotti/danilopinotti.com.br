<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools' }, { label: 'Base64 Encoder/Decoder' }]" />

      <h1 class="text-2xl font-bold mb-4">
        Base64 Encoder/Decoder
      </h1>

      <ToolsBase64EncoderDecoder/>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>

</style>
