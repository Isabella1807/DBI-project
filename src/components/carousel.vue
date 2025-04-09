<script setup lang="ts">

import Test from "@/components/test.vue";
</script>

<template>
  <div class="carousel">
    <test/>
    <test/>
    <test/>
  </div>
</template>

<style scoped lang="scss">
.carousel{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  border: 1px solid red;
}
</style>
