<script setup lang="ts">
import BasicIcon from '@/components/BasicIcon.vue';
</script>

<template>
  <div class="search-wrapper">
    <input type="text" placeholder="Søg" class="search-input" />
    <BasicIcon name="SearchGlass" />
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  background-color: $white;

  .search-input {
  border: none;
  outline: none;
  font-style: italic;
  flex: 1;
}

}
</style>
