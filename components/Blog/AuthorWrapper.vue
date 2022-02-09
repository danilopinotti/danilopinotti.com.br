<template>
  <div class="inline-flex items-center">
    <img alt="blog" :src="img"
         class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
    <div class="flex-grow flex flex-col pl-4">
      <span class="title-font font-medium text-gray-900">
        {{ name }}
      </span>
    <span v-if="bio" class="text-gray-400 text-xs tracking-widest mt-0.5">
      {{ bio }}
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorWrapper",
  props: {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    img: {
      required: false,
      type: String,
      default: 'https://dummyimage.com/104x104'
    },
  },
}
</script>

<style scoped>

</style>
