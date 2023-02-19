<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mt-0 md:mt-8">
      <div class="flex flex-wrap justify-center">
        <article
          class="prose lg:prose-lg prose-slate prose-img:rounded-xl prose-pre:w-[300px] sm:prose-pre:w-[600px] md:prose-pre:w-full prose-pre:overflow-auto prose-a:text-blue-600 prose-headings:cursor-default prose-code:break-all md:prose-code:break-normal"
        >
          <nuxt-content :document="article" />

          <span class="justify-self-end text-gray-500 text-sm">
            Data de publicação: {{ $formatDate(article.publishedAt) }}
          </span>
          <br>
          <BlogAuthor :author="article.author" />
        </article>
      </div>
      <div>
        <BlogPrevNext :prev="prev" :next="next" />
      </div>
    </div>
  </div>
</template>

<script>
import Author from "~/components/Blog/Author";
import GoBack from "@/components/Shared/Buttons/GoBack";

export default {
  components: { GoBack, Author },
  head() {
    let meta = [
      {
        hid: "description",
        name: "description",
        content: this.article.description,
      },
    ];

    if (this.article.keywords) {
      meta.push({
        hid: "keywords",
        name: "keywords",
        content: this.article.keywords,
      });
    }

    return {
      title: this.article.title,
      meta: meta,
    };
  },
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();

    const [prev, next] = await $content("articles")
      .only(["title", "slug"])
      .sortBy("publishedAt", "asc")
      .surround(params.slug)
      .fetch();

    return {
      article,
      prev,
      next,
    };
  },
};
</script>
