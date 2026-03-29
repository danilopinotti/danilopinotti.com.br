<template>
  <footer class="footer bg-base-200 text-base-content p-10 md:grid-flow-col md:justify-between md:px-24 lg:px-48">
    <nav>
      <h6 class="footer-title">Tools</h6>
      <NuxtLink
        v-for="tool in tools"
        :key="tool.to"
        :to="tool.to"
        class="link link-hover"
      >
        {{ tool.label }}
      </NuxtLink>
    </nav>
    <nav>
      <h6 class="footer-title">About</h6>
      <NuxtLink to="/about" class="link link-hover">
        About Me
      </NuxtLink>
      <a class="link link-hover"
         href="mailto:%63%6f%6e%74%61%74%6f%40%64%61%6e%69%6c%6f%70%69%6e%6f%74%74%69%2e%63%6f%6d%2e%62%72">Contact</a>
      <a class="link link-hover" href="https://github.com/danilopinotti/danilopinotti.com.br">
        Contribute with this site
      </a>
      <NuxtLink to="/open-source-usages" class="link link-hover">
        Open Source Usages
      </NuxtLink>
    </nav>
    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4 text-3xl">
        <a class="hover:text-black" href="https://github.com/danilopinotti" title="Github">
          <Icon name="fa6-brands:github" class="mr-1" />
        </a>
        <a class="hover:text-[#0E76A8]" href="https://www.linkedin.com/in/danilopinotti/" title="Linkedin">
          <Icon name="fa6-brands:linkedin" class="mr-1" />
        </a>
        <a class="hover:text-[#00ACEE]" href="https://twitter.com/danilopinotti" title="Twitter">
          <Icon name="fa6-brands:twitter" class="mr-1" />
        </a>
      </div>
      <div class="mt-3 text-center">
        <p>{{ new Date().getFullYear() }}</p>
      </div>
    </nav>
  </footer>
</template>

<script setup>
const tools = useTools()
</script>

<style scoped>

</style>
