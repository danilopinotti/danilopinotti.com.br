<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Open Source Usages' }]" />

      <h1 class="text-2xl font-bold mb-4">Open Source Usages</h1>

      <p class="mb-4">
        This is a list of open-source technologies that are used in the project. Thanks to:
      </p>

      <ul class="list-disc ml-8 mb-4 space-y-1">
        <li v-for="technology in technologies" :key="technology.name">
          <a class="text-blue-700 hover:text-blue-900 hover:underline" :href="technology.link" target="_blank">
            {{ technology.name }}
          </a>
        </li>
      </ul>

      <p>
        Other frontend libs was used too.
        See the full list
        <a class="text-blue-700 hover:text-blue-900 hover:underline"
           target="_blank"
           href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/package.json">
          here
        </a>.
      </p>
    </div>
  </section>
</template>

<script setup>
const technologies = [
  { name: 'Nuxt', link: 'https://github.com/nuxt/nuxt' },
  { name: 'Nuxt Content', link: 'https://github.com/nuxt/content' },
  { name: 'TailwindCSS', link: 'https://github.com/tailwindlabs/tailwindcss' },
  { name: 'Tailwind CSS Typography', link: 'https://github.com/tailwindlabs/tailwindcss-typography' },
  { name: 'Iconify (via @nuxt/icon)', link: 'https://github.com/iconify/iconify' },
  { name: 'DaisyUI', link: 'https://github.com/saadeghi/daisyui' },
  { name: 'date-fns', link: 'https://github.com/date-fns/date-fns' },
  { name: 'Hero Icons', link: 'https://heroicons.com' },
  { name: 'Nuxt Sitemap', link: 'https://github.com/nuxt-modules/sitemap' },
  { name: 'better-sqlite3', link: 'https://github.com/WiseLibs/better-sqlite3' },
]
</script>

<style scoped>

</style>
