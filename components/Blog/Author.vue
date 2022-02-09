<template>
  <component :is="getAuthorComponentName()">
    <BlogAuthorWrapper
      name="Desconhecido"
    ></BlogAuthorWrapper>
  </component>
</template>

<script>
  import {camelCase, startCase} from 'lodash';
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    },
    methods: {
      getAuthorComponentName() {
        return 'Authors' + startCase(camelCase(this.author.name)).replace(/ /g, '');
      }
    }
  }
</script>

<style scoped>

</style>
