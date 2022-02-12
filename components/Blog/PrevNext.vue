<template>
  <div class="flex justify-between">
    <div class="w-1/2 flex justify-start">
      <NuxtLink v-if="prev"
                :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
                class="btn normal-case w-full xl:w-3/4">
        {{ prev.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>

    <div class="w-1/2 flex justify-end">
      <NuxtLink v-if="next"
                :to="{ name: 'blog-slug', params: { slug: next.slug } }"
                class="btn normal-case w-full xl:w-3/4">
        {{ next.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style scoped>

</style>
