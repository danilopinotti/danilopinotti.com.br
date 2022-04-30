<template>
  <div>
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 pt-1 pb-12 mx-auto">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              Tools
            </li>
          </ul>
        </div>

        <h1 class="text-2xl font-bold mb-4">
          Tools
        </h1>
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              Device Battery Life Estimator
              <div class="badge badge-outline">IoT</div>
            </h2>
            <p>Calculate an estimate of the battery life of IoT devices.</p>
            <div class="card-actions justify-end">
              <NuxtLink to="/tools/device-battery-life-estimator" class="btn btn-primary">Open Tool</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
