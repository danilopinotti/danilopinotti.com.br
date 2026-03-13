<template>
  <header
    :class="[
      'sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 transition-shadow duration-300',
      scrolled ? 'shadow-md' : 'shadow-sm'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between px-4 h-18">

      <!-- Logo -->
      <NuxtLink class="flex items-center gap-2 shrink-0" to="/">
        <Icon name="heroicons:code-bracket" class="text-sky-600" size="30" />
        <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 hover:from-sky-600 hover:to-slate-700 transition-all duration-300">
          Danilo Pinotti
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          class="nav-link"
          to="/presentations"
          title="Presentations"
        >
          <Icon name="heroicons:presentation-chart-line" class="w-5 h-5" />
          Presentations
        </NuxtLink>

        <!-- Tools dropdown -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="nav-link cursor-pointer select-none">
            <NuxtLink to="/tools" class="flex items-center gap-1.5" @click.stop>
              <Icon name="heroicons:wrench-screwdriver" class="w-5 h-5" />
              Tools
            </NuxtLink>
            <Icon name="fa6-solid:chevron-down" class="w-3.5 h-3.5 text-gray-400" />
          </div>
          <ul class="dropdown-content menu p-2 mt-2 shadow-lg bg-white border border-gray-100 rounded-xl w-72 z-50">
            <li v-for="tool in tools" :key="tool.to">
              <NuxtLink class="tool-link" :to="tool.to" @click="closeDropdown">
                <div>
                  <p class="font-semibold text-gray-800">{{ tool.label }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ tool.description }}</p>
                </div>
                <Icon :name="tool.icon" :class="tool.iconClass + ' shrink-0'" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Social icons + mobile toggle -->
      <div class="flex items-center gap-2">
        <!-- Social icons (desktop) -->
        <div class="hidden md:flex items-center gap-1">
          <a class="social-icon text-[#1E1E1E]" href="https://github.com/danilopinotti" title="Github Profile" target="_blank">
            <Icon name="fa6-brands:github" size="30" />
          </a>
          <a class="social-icon text-[#0E76A8]" href="https://www.linkedin.com/in/danilopinotti/" title="Linkedin Profile" target="_blank">
            <Icon name="fa6-brands:linkedin" size="30" />
          </a>
          <a class="social-icon text-[#00ACEE]" href="https://twitter.com/danilopinotti" title="Twitter Profile" target="_blank">
            <Icon name="fa6-brands:twitter" size="30" />
          </a>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          @click="menuOpen = !menuOpen"
          aria-label="Toggle menu"
        >
          <Icon :name="menuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" size="30" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="menu">
      <div v-show="menuOpen" class="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
        <NuxtLink class="mobile-link" to="/presentations" @click="menuOpen = false">
          <Icon name="heroicons:presentation-chart-line" class="w-4 h-4" />
          Presentations
        </NuxtLink>
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mt-2 mb-1">Tools</div>
        <NuxtLink
          v-for="tool in tools"
          :key="tool.to"
          class="mobile-link"
          :to="tool.to"
          @click="menuOpen = false"
        >
          <Icon :name="tool.icon" class="w-4 h-4" :class="tool.iconClass" />
          {{ tool.label }}
        </NuxtLink>

        <!-- Social icons (mobile) -->
        <div class="flex items-center justify-center gap-3 px-2 pt-3 mt-2 border-t border-gray-100">
          <a class="social-icon text-[#1E1E1E]" href="https://github.com/danilopinotti" title="Github" target="_blank">
            <Icon name="fa6-brands:github" size="36" />
          </a>
          <a class="social-icon text-[#0E76A8]" href="https://www.linkedin.com/in/danilopinotti/" title="Linkedin" target="_blank">
            <Icon name="fa6-brands:linkedin" size="36" />
          </a>
          <a class="social-icon text-[#00ACEE]" href="https://twitter.com/danilopinotti" title="Twitter" target="_blank">
            <Icon name="fa6-brands:twitter" size="36" />
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
const tools = useTools()
const menuOpen = ref(false)
const scrolled = ref(false)

const closeDropdown = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 8
  })
})
</script>

<style scoped>
@reference "tailwindcss";

.nav-link {
  @apply flex items-center gap-1.5 px-3 py-2 rounded-lg text-lg font-semibold text-gray-600
    hover:text-sky-700 hover:bg-sky-50 transition-colors duration-150;
}

.nav-link.router-link-active:not([href='/']) {
  @apply text-sky-700 bg-sky-50;
}

.tool-link {
  @apply flex items-center justify-between w-full rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors duration-150;
}

.mobile-link {
  @apply flex items-center gap-2 px-3 py-2.5 rounded-lg text-lg font-semibold text-gray-600
    hover:text-sky-700 hover:bg-sky-50 transition-colors duration-150;
}

.mobile-link.router-link-active:not([href='/']) {
  @apply text-sky-700 bg-sky-50;
}

.social-icon {
  @apply p-2 rounded-lg hover:bg-gray-100 transition-all duration-150 hover:scale-110 flex items-center;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
