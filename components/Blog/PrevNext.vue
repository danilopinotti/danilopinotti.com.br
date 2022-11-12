<template>
  <div class="block md:flex justify-between">
    <div class="w-full md:w-1/2 flex justify-start mb-2 md:mb-0">
      <NuxtLink v-if="next"
                :to="{ name: routeName, params: { slug: next.slug } }"
                class="btn normal-case w-full xl:w-3/4">
        {{ next.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
    <div class="w-full md:w-1/2 flex justify-end">
      <NuxtLink v-if="prev"
                :to="{ name: routeName, params: { slug: prev.slug } }"
                class="btn normal-case w-full xl:w-3/4">
        {{ prev.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      default: 'blog-slug'
    },
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
