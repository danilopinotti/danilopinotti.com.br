<template>
  <button @click.prevent="goBack" class="btn btn-link">
    <slot>
      Voltar
    </slot>
  </button>
</template>

<script>
export default {
  name: 'GoBack',
  methods: {
    goBack () {
      return this.$router.go(-1)
    }
  },
}
</script>
