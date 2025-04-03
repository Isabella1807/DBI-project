<script setup lang="ts">
</script>

<template>
  <div class="body_container">
    <div class="main_container">
      <main>
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
      padding: 4rem 0;
    }
  }
}
</style>
