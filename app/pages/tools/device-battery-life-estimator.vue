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
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/tools/device-battery-life-estimator`
const description = 'Estimate the battery life of IoT devices based on capacity and consumption parameters. Free online battery life calculator for ESP32, Arduino and more.'

useHead({
  title: 'Device Battery Life Estimator',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'iot, esp32, battery life, battery life estimator, 18650, power consumption, optimization, low power, arduino, battery calculator' },
    { property: 'og:title', content: 'Device Battery Life Estimator | Danilo Pinotti' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Device Battery Life Estimator',
        description,
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
        },
        author: {
          '@type': 'Person',
          name: 'Danilo Pinotti',
          url: siteUrl,
        },
      }),
    },
  ],
})
</script>

<style scoped>

</style>
