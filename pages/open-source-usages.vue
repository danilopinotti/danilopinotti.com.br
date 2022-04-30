<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-4 pb-12 mx-auto">
      <h1 class="text-3xl">Open Source Usages</h1>
      <p>
        This is a list of Open-Source Technologies that are used in the project.
      </p>

      <ul class="list-disc ml-8">
        <li v-for="technology in technologies" :key="name">
          <a class="link link-hover" :href="technology.link">{{ technology.name }}</a>
        </li>
      </ul>
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
      ]
    }
  },
}
</script>

<style scoped>

</style>
