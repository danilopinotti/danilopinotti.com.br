<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>Tools</li>
          <li>Base64 Encoder/Decoder</li>
        </ul>
      </div>

      <h1 class="text-2xl font-bold mb-4">
        Base64 Encoder/Decoder
      </h1>

      <ToolsBase64EncoderDecoder/>
    </div>
  </section>
</template>

<script>
export default {
  name: "base64"
}
</script>

<style scoped>

</style>
