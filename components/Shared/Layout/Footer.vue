<template>
  <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
    <div class="grid grid-flow-col gap-4">
      <NuxtLink class="link link-hover" to="/">Home</NuxtLink>
      <NuxtLink class="link link-hover" to="/tools">Tools</NuxtLink>
      <a class="link link-hover" href="mailto:%63%6f%6e%74%61%74%6f%40%64%61%6e%69%6c%6f%70%69%6e%6f%74%74%69%2e%63%6f%6d%2e%62%72">Contact</a>
      <NuxtLink to="/open-source-usages" class="link link-hover">Open Source Usages</NuxtLink>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4 text-3xl">
        <a class="hover:text-black" href="https://github.com/danilopinotti" title="Github">
          <fa :icon="['fab', 'github']" class="mr-1"></fa>
        </a>
        <a class="hover:text-[#0E76A8]" href="https://www.linkedin.com/in/danilopinotti/" title="Linkedin">
          <fa :icon="['fab', 'linkedin']" class="mr-1"></fa>
        </a>

        <a class="hover:text-[#00ACEE]" href="https://twitter.com/danilopinotti" title="Twitter">
          <fa :icon="['fab', 'twitter']" class="mr-1"></fa>
        </a>
      </div>
    </div>
    <div>
      <p>{{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
