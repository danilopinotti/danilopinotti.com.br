<template>
  <header class="navbar text-gray-600 body-font bg-base-200 border-b">
    <div class="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
      <NuxtLink class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hove:underline" to="/">
        <span class="m-0 md:ml-3 text-3xl font-bold text-[#1E1E1E] tracking-wider">
          Danilo Pinotti
        </span>
      </NuxtLink>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center gap-3 md:gap-4 font-bold md:mr-4">
        <NuxtLink class="hover:text-red-800" to="/tools">
          <fa icon="toolbox" class="mr-1"></fa>
          Tools
        </NuxtLink>
        <a class="hover:text-[#1E1E1E]" href="https://github.com/danilopinotti">
          <fa :icon="['fab', 'github']" class="mr-1"></fa>
          Github
        </a>
        <a class="hover:text-[#0E76A8]" href="https://www.linkedin.com/in/danilopinotti/">
          <fa :icon="['fab', 'linkedin']" class="mr-1"></fa>
          Linkedin
        </a>

        <a class="hover:text-[#00ACEE]" href="https://twitter.com/danilopinotti">
          <fa :icon="['fab', 'twitter']" class="mr-1"></fa>
          Twitter
        </a>
      </nav>
    </div>
  </header>
</template>
