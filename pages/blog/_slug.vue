<template>
  <div class="flex flex-wrap justify-center">
    <div>
      <div class="text-center">
        <NuxtLink to="/" class="btn btn-link p-0 mr-2">Home</NuxtLink>
        | <GoBack class="inline px-0 mx-2"></GoBack>
      </div>
      <div class="flex justify-center">
        <article class="w-full prose lg:prose-lg prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600">
          <nuxt-content :document="article"/>

          <span class="justify-self-end text-gray-500 text-sm">Data de publicação: {{ $formatDate(article.publishedAt) }}</span>
          <BlogAuthor :author="article.author"/>
        </article>
      </div>
      <div>
        <BlogPrevNext :prev="prev" :next="next"/>
      </div>
    </div>
  </div>
</template>

<script>
import Author from "~/components/Blog/Author";
import GoBack from "@/components/Shared/Buttons/GoBack";

export default {
  components: {GoBack, Author},
  async asyncData({$content, params}) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('publishedAt', 'asc')
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
