<template>
  <div class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
    {{tag}}
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
