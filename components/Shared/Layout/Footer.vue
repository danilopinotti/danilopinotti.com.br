<template>
  <footer class="footer p-10 bg-base-200 text-base-content">
    <div>
      <span class="footer-title">Tools</span>

      <NuxtLink to="/tools/device-battery-life-estimator" class="link link-hover">Device Battery Life Estimator
      </NuxtLink>
    </div>
    <div>
      <span class="footer-title">About</span>
      <a class="link link-hover"
         href="mailto:%63%6f%6e%74%61%74%6f%40%64%61%6e%69%6c%6f%70%69%6e%6f%74%74%69%2e%63%6f%6d%2e%62%72">Contact</a>
      <a class="link link-hover" href="https://github.com/danilopinotti/danilopinotti.com.br">
        Contribute with this site
      </a>
    </div>
    <div>
      <span class="footer-title">Social</span>
      <div class="grid grid-flow-col gap-4">
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
      </div>

      <div class="mt-3 text-center">
        <p>{{ new Date().getFullYear() }}</p>
      </div>
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
