<template>
  <header class="navbar  p-0 text-gray-600 body-font bg-base-200 md:border-b">
    <div class="container mx-auto flex flex-wrap pt-5 md:pb-5 flex-col md:flex-row items-center">
      <NuxtLink class="order-1 flex title-font font-medium items-center mb-2 md:mb-0" to="/">
        <span
          class="m-0 md:ml-3 text-3xl font-semibold hover:text-black text-transparent bg-clip-text
            bg-gradient-to-r from-slate-600 to-slate-700">
          <SharedIconsCode class="text-sky-600"></SharedIconsCode>
          Danilo Pinotti
        </span>
      </NuxtLink>

      <div class="order-3 md:order-2 mt-2 md:mt-0 md:ml-6 py-3 md:p-0 flex gap-1 bg-white md:bg-transparent
      w-full md:w-auto text-center flex items-center justify-center border-b md:border-b-0">
        <NuxtLink class="text-sky-600 hover:text-sky-800 hover:bg-gray-200 rounded-lg p-2 font-semibold flex items-center gap-1"
                  to="/presentations" title="Tools">
          <SharedIconsPresentation class="w-5 h-5"></SharedIconsPresentation>
          Presentations
        </NuxtLink>
        <div class="dropdown dropdown-end text-md">
          <div tabindex="0"
                 class="text-sky-600 hover:text-sky-800 hover:bg-gray-200 rounded-lg p-2 cursor-pointer font-semibold flex items-center gap-1">
            <SharedIconsTools class="w-5 h-5"></SharedIconsTools>
            Tools
            <fa :icon="['fas', 'chevron-down']" class="text-sm text-gray-400"></fa>
          </div>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-4">
            <li>
              <NuxtLink class="flex flex-col w-64 text-left"
                        to="/tools/device-battery-life-estimator">
                <p class="font-bold">
                  <fa icon="battery-full" class="text-green-600"></fa>
                  Device Battery Life Estimator
                </p>
                <p>Calculate an estimate of the battery life of IoT devices.</p>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <nav
        class="order-2 md:order-3 mt-0 md:mr-4 md:ml-auto flex flex-wrap items-center text-base justify-center gap-3 md:gap-4 font-bold">
        <a class="text-[#1E1E1E] text-2xl md:text-3xl hover:scale-125"
           href="https://github.com/danilopinotti"
           title="Github Profile">
          <fa :icon="['fab', 'github']" class="mr-1"></fa>
        </a>
        <a class="text-[#0E76A8] text-2xl md:text-3xl hover:scale-125"
           href="https://www.linkedin.com/in/danilopinotti/"
           title="Linkedin Profile"
        >
          <fa :icon="['fab', 'linkedin']" class="mr-1"></fa>
        </a>

        <a class="text-[#00ACEE] text-2xl md:text-3xl hover:scale-125"
           href="https://twitter.com/danilopinotti"
           title="Twitter Profile">
          <fa :icon="['fab', 'twitter']" class="mr-1"></fa>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
a.nuxt-link-active:not([href='/']) {
  @apply bg-gray-100;
}
</style>
