<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Home', to: '/' }, { label: 'Tools' }]
  }
})
</script>

