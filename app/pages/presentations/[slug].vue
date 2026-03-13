<template>
  <div class="container px-5 pt-1 pb-12 mx-auto">
    <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Presentations', to: '/presentations' }, { label: presentation?.title }]" />
    <div class="mt-0 md:mt-8">
      <div class="flex flex-wrap justify-center" v-if="presentation">
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
              <p class="prose">
                {{ presentation.description }}
              </p>
              <div class="mt-4 text-gray-600">
                <a :href="presentation.link"
                   class="hover:text-gray-900 hover:underline"
                   title="Abrir link externo" target="_blank">
                  <Icon name="fa6-solid:arrow-up-right-from-square" class="mr-1" />
                  Abrir link externo
                </a>
                <p class="justify-self-end">
                  <Icon name="fa6-regular:calendar" class="mr-1" />
                  Data de publicação: {{ formatDate(presentation.publishedAt) }}
                </p>
              </div>
              <BlogAuthor :author="presentation.author" class="mt-4"/>

              <div class="w-full mx-auto">
                <BlogPrevNext route-prefix="/presentations" class="mt-8" :prev="surround?.[0]" :next="surround?.[1]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const { formatDate } = useFormatDate()

const { data: presentation } = await useAsyncData(`presentation-${slug}`, () =>
  queryCollection('presentations').path(`/presentations/${slug}`).first()
)

const { data: surround } = await useAsyncData(`presentation-surround-${slug}`, () =>
  queryCollectionItemSurroundings('presentations', `/presentations/${slug}`, {
    before: 1,
    after: 1,
  })
)

useHead(() => {
  if (!presentation.value) return {}

  const meta = [
    { name: 'description', content: presentation.value.description },
  ]

  if (presentation.value.keywords) {
    meta.push({ name: 'keywords', content: presentation.value.keywords })
  }

  return {
    title: presentation.value.title,
    meta,
  }
})
</script>
