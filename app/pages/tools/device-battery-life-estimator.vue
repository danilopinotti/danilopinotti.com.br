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
</script>

<style scoped>

</style>
