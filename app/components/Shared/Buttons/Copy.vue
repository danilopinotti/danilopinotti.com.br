<template>
  <button
    @click="copyToClipboard"
    type="button"
    aria-label="Copy to clipboard"
  >
    <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>

    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const copied = ref(false)

async function copyToClipboard() {
  if (!props.text) return

  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Fail to copy to clipboard:', err)
  }
}
</script>
