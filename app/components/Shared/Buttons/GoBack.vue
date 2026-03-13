<template>
  <button @click.prevent="goBack" class="btn btn-link">
    <slot>
      Voltar
    </slot>
  </button>
</template>

<script setup>

const router = useRouter()

function goBack() {
  return router.go(-1)
}
</script>
