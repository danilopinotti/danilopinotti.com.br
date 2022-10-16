<template>
  <section class="flex items-center h-full p-16">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl">
          <span class="sr-only">Error</span>{{ error.statusCode }}
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          <template v-if="error.statusCode === 404">
            Página não encontrada
          </template>

          <template v-else>
            Ocorreu um erro
          </template>
        </p>

        <NuxtLink to="/"
                  class="px-8 py-4 font-semibold rounded hover:text-black">
          Voltar para a Página Inicial
        </NuxtLink>
      </div>
    </div>

  </section>

</template>

<script>
export default {
  name: "error.vue",
  props: ['error'],
}
</script>

<style scoped>

</style>
