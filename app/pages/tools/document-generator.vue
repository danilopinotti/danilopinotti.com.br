<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools' }, { label: 'Document Generator (CPF and CNPJ)' }]" />

      <h1 class="text-2xl font-bold mb-4">
        Document Generator (CPF and CNPJ)
      </h1>

      <ToolsDocumentGenerator/>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>

</style>
