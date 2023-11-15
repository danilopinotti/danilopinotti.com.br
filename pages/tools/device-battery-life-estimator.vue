<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>Tools</li>
          <li>Device Battery Life Estimator</li>
        </ul>
      </div>

      <h1 class="text-2xl font-bold mb-4">
        Device Battery Life Estimator
      </h1>

      <ToolsBatteryLifeEstimator/>
    </div>
  </section>
</template>

<script>
export default {
  name: "device-battery-life-estimator"
}
</script>

<style scoped>

</style>
