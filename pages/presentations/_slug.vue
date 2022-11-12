<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/presentations">Presentations</NuxtLink>
        </li>
        <li>
          {{ presentation.title }}
        </li>
      </ul>
    </div>
    <div class="mt-0 md:mt-8">
      <div class="flex flex-wrap justify-center">
        <div class="px-4">
          <div class="flex flex-wrap justify-center gap-8">
            <iframe :src="presentation.embed_link" width="595" height="485"
                    frameborder="0" marginwidth="0" marginheight="0" scrolling="no"
                    style="max-width: 100%;" allowfullscreen>
            </iframe>
            <div>
              <h1 class="text-2xl font-medium text-gray-900 title-font">
                {{ presentation.title }}
              </h1>
              <p>
                {{ presentation.description }}
              </p>
              <div class="mt-4 text-gray-600">
                <a :href="presentation.link"
                   class="hover:text-gray-900 hover:underline"
                   title="Abrir link externo" target="_blank">
                  <fa icon="arrow-up-right-from-square" class="mr-1"></fa>
                  Abrir link externo
                </a>
                <p class="justify-self-end">
                  <fa :icon="['far', 'calendar']" class="mr-1"></fa>
                  Data de publicação: {{ $formatDate(presentation.publishedAt) }}
                </p>
              </div>
              <BlogAuthor :author="presentation.author" class="mt-4"/>

              <div class="w-full mx-auto">
                <BlogPrevNext route-name="presentations-slug" class="mt-8" :prev="prev" :next="next"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Author from "~/components/Blog/Author";
import GoBack from "@/components/Shared/Buttons/GoBack";

export default {
  components: {GoBack, Author},
  head() {
    let meta = [
      {
        hid: "description",
        name: "description",
        content: this.presentation.description
      },
    ];

    if (this.presentation.keywords) {
      meta.push({
        hid: "keywords",
        name: "keywords",
        content: this.presentation.keywords
      });
    }

    return {
      title: this.presentation.title,
      meta: meta
    };
  },
  async asyncData({$content, params}) {
    const presentation = await $content('presentations', params.slug).fetch()

    const [prev, next] = await $content('presentations')
      .only(['title', 'slug'])
      .sortBy('publishedAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      presentation,
      prev,
      next
    }
  },
}
</script>
