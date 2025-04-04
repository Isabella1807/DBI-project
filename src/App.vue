<script setup lang="ts">
import TabNav from '@/components/TabNav.vue';
import WaterMark from '@/components/WaterMark.vue';
</script>

<template>
  <div class="body_container">
    <WaterMark/>
    <div class="main_container">
      <main>
        <TabNav/>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body_container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .main_container {
    flex: 1;
    display: flex;
    justify-content: space-around;

    main {
      max-width: min(1280px, calc(100% - 3rem));
      flex: 1;
    }
  }
}
</style>
