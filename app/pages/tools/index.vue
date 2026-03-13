<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools' }]" />

      <h1 class="text-2xl font-bold mb-8">Tools</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.to"
          :to="tool.to"
          class="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white transition-all duration-200"
        >
          <div class="shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Icon :name="tool.icon" :class="tool.iconClass" size="26" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-gray-800 group-hover:text-blue-800 transition-colors duration-150 mb-1">
              {{ tool.label }}
            </span>
            <span class="text-sm text-gray-500 leading-relaxed">
              {{ tool.description }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const tools = useTools()

useHead({
  title: 'Tools',
  meta: [{ name: 'description', content: 'A collection of useful tools.' }],
})
</script>

