<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-4 pb-12 mx-auto">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>Open Source Usages</li>
        </ul>
      </div>

      <h1 class="text-3xl">Open Source Usages</h1>
      <p>
        This is a list of open-source technologies that are used in the project. Thanks to:
      </p>

      <ul class="list-disc ml-8">
        <li v-for="technology in technologies" :key="name">
          <a class="link link-hover" :href="technology.link">{{ technology.name }}</a>
        </li>
      </ul>

      <p>
        Other frontend libs was used too.
        See the full list
        <a class="link link-hover text-blue-700 hover:text-blue-900"
           target="_blank"
           href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/package.json">
          here
        </a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "open-source-usages",
  computed: {
    technologies() {
      return [
        {name: 'Nuxt JS', link: 'https://github.com/nuxt/nuxt.js'},
        {name: 'TailwindCSS', link: 'https://github.com/tailwindlabs/tailwindcss'},
        {name: 'Font Awesome', link: 'https://github.com/FortAwesome/Font-Awesome'},
        {name: 'Lodash', link: 'https://github.com/lodash/lodash'},
        {name: 'Moment JS', link: 'https://github.com/moment/moment'},
        {name: 'DaisyUI', link: 'https://github.com/saadeghi/daisyui'},
        {name: 'Hero Icons', link: 'https://heroicons.com'},
      ]
    }
  },
}
</script>

<style scoped>

</style>
