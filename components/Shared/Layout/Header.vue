<template>
  <header class="navbar text-gray-600 body-font bg-base-200 border-b">
    <div class="container mx-auto flex flex-wrap pt-5 pb-2 md:pb-5 flex-col md:flex-row items-center">
      <NuxtLink class="flex title-font font-medium items-center mb-4 md:mb-0" to="/">
        <span class="m-0 md:ml-3 text-3xl font-bold hover:text-black text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800">
          Danilo Pinotti
        </span>
      </NuxtLink>

      <div class="m-0 md:ml-6 flex gap-4">
        <NuxtLink class="text-teal-600 hover:text-teal-700 font-semibold" to="/tools" title="Tools">
          <SharedIconsTools></SharedIconsTools>
          Tools
        </NuxtLink>
        <NuxtLink v-if="false" class="text-amber-600 hover:text-amber-700 font-semibold" to="/presentations" title="Tools">
          <SharedIconsPresentation></SharedIconsPresentation>
          Presentations
        </NuxtLink>
      </div>

      <nav class="mt-2 md:mt-0 md:mr-4 md:ml-auto flex flex-wrap items-center text-base justify-center gap-3 md:gap-4 font-bold">
        <a class="text-[#1E1E1E] text-xl md:text-2xl hover:scale-125"
           href="https://github.com/danilopinotti"
           title="Github Profile">
          <fa :icon="['fab', 'github']" class="mr-1"></fa>
        </a>
        <a class="text-[#0E76A8] text-xl md:text-2xl hover:scale-125"
           href="https://www.linkedin.com/in/danilopinotti/"
           title="Linkedin Profile"
        >
          <fa :icon="['fab', 'linkedin']" class="mr-1"></fa>
        </a>

        <a class="text-[#00ACEE] text-xl md:text-2xl hover:scale-125"
           href="https://twitter.com/danilopinotti"
           title="Twitter Profile">
          <fa :icon="['fab', 'twitter']" class="mr-1"></fa>
        </a>
      </nav>
    </div>
  </header>
</template>
