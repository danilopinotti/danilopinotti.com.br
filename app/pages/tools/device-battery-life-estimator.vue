<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools', icon: 'heroicons:wrench-screwdriver' }, { label: 'Device Battery Life Estimator', icon: tool?.icon }]" />

      <h1 class="text-2xl font-bold mb-4">
        Device Battery Life Estimator
      </h1>

      <ToolsBatteryLifeEstimator/>
    </div>
  </section>
</template>

<script setup>
const tool = useTools().find(t => t.to === '/tools/device-battery-life-estimator')

useHead({
  title: 'Device Battery Life Estimator',
  meta: [
    { name: 'description', content: 'Estimate the battery life of IoT devices based on capacity and consumption parameters.' },
    { property: 'og:title', content: 'Device Battery Life Estimator | Danilo Pinotti' },
    { property: 'og:description', content: 'Estimate the battery life of IoT devices based on capacity and consumption parameters.' },
    { property: 'og:url', content: 'https://danilopinotti.com.br/tools/device-battery-life-estimator' },
  ],
  link: [{ rel: 'canonical', href: 'https://danilopinotti.com.br/tools/device-battery-life-estimator' }],
})
</script>

<style scoped>

</style>
