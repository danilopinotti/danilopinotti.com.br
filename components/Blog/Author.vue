<template>
  <component :is="authorComponentName">
    <BlogAuthorWrapper name="Desconhecido" />
  </component>
</template>

<script setup>
const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})

const authorComponentName = computed(() => {
  const name = props.author.name
  return 'Authors' + name
    .split(/[\s-]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
})
</script>

<style scoped>

</style>
