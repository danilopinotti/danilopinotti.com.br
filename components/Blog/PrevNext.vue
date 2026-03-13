<template>
  <div class="block md:flex justify-between">
    <div class="w-full md:w-1/2 flex justify-start mb-2 md:mb-0">
      <NuxtLink v-if="next"
                :to="itemPath(next)"
                class="btn normal-case w-full xl:w-3/4">
        {{ next.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
    <div class="w-full md:w-1/2 flex justify-end">
      <NuxtLink v-if="prev"
                :to="itemPath(prev)"
                class="btn normal-case w-full xl:w-3/4">
        {{ prev.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  routePrefix: {
    type: String,
    default: '/blog'
  },
  prev: {
    type: Object,
    default: () => null
  },
  next: {
    type: Object,
    default: () => null
  }
})

function itemPath(item) {
  if (!item?._path) return ''
  const slug = item._path.split('/').pop()
  return `${props.routePrefix}/${slug}`
}
</script>

<style scoped>

</style>
