<script setup lang="ts">
import TabNav from '@/components/organisms/TabNav.vue';
import WaterMark from '@/components/atoms/WaterMark.vue';
import UnderMenu from "@/components/organisms/UnderMenu.vue";
import MellemLedet from '@/components/molecules/MellemLedet.vue';
</script>

<template>
  <div class="bodyContainer">
    <WaterMark />
    <div class="mainContainer">
      <main>
        <TabNav />
        <UnderMenu />
        <MellemLedet/>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bodyContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: 1px solid red;

  .mainContainer {
    flex: 1;
    display: flex;
    justify-content: space-around;
    border: 1px solid blue;

    main {
      max-width: min(1280px, calc(100% - 3rem));
      flex: 1;
      border: 1px solid blueviolet;
    }
  }
}
</style>
