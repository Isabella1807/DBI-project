<script setup lang="ts">
import BasicIcon from '@/components/atoms/BasicIcon.vue';
</script>

<template>
  <div class="searchWrapper">
    <input type="text" placeholder="Søg" class="searchInput" />
    <BasicIcon name="SearchGlass" />
  </div>
</template>

<style scoped lang="scss">
.searchWrapper {
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  background-color: $white;

  .searchInput {
  border: none;
  outline: none;
  font-style: italic;
  flex: 1;
}

}
</style>
