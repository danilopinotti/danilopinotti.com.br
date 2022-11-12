<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          Presentations
        </li>
      </ul>
    </div>

    <div class="mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div v-for="presentation in presentations" :key="presentation.slug"
           class="mockup-window border border-base-300">
        <span class="absolute float w-full top-4 text-center font-bold text-gray-600">
          {{ presentation.title }}
        </span>
        <div class="flex flex-col justify-center px-4 border-t py-8 border-base-300">

          <NuxtLink :to="{ name: 'presentations-slug', params: { slug: presentation.slug }}">
            <span class="text-2xl font-bold text-gray-600 hover:text-blue-700 title-font">
              {{ presentation.title }}
            </span>
            <div class="leading-relaxed">{{ presentation.description }}</div>
          </NuxtLink>

          <div class="mt-2 text-sm font-light">
            <fa :icon="['far', 'calendar']" class="mr-1"></fa>
            Data de publicação: {{ $formatDate(presentation.publishedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, params}) {
    const presentations = await $content('presentations')
      .only(['title', 'description', 'slug', 'author', 'link', 'embed_link', 'publishedAt'])
      .sortBy('publishedAt', 'desc')
      .fetch()

    return {
      presentations
    }
  }
}
</script>
