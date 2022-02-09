<template>
  <div class="flex w-full justify-center">
    <article class="prose">
      <p>Data de publicação: {{ article.updatedAt }}</p>
      <nuxt-content :document="article"/>
      <BlogAuthor :author="article.author"/>
      <BlogPrevNext :prev="prev" :next="next"/>
    </article>
  </div>
</template>

<script>
import Author from "~/components/Blog/Author";

export default {
  components: {Author},
  async asyncData({$content, params}) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
}
</script>

<style scoped>

</style>
