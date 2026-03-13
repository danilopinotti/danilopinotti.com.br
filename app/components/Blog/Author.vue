<template>
  <component v-if="authorComponent" :is="authorComponent" />
  <BlogAuthorWrapper v-else name="Desconhecido" />
</template>

<script setup>
const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})

// resolveComponent must be called synchronously in setup, not inside computed
const authorMap = {
  'danilo pinotti': resolveComponent('AuthorsDaniloPinotti'),
}

const authorComponent = computed(() => {
  const name = props.author?.name?.toLowerCase().trim()
  return name ? (authorMap[name] ?? null) : null
})
</script>
