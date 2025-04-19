<script setup lang="ts">
import TabNav from '@/components/organisms/TabNav.vue';
import WaterMark from '@/components/atoms/WaterMark.vue';
import UnderMenu from "@/components/organisms/UnderMenu.vue";
import CreateEntityWizard from '@/components/tempWizardStuff/CreateEntityWizard.vue';
</script>

<template>
  <div class="body_container">
    <WaterMark />
    <div class="main_container">
      <main>
        <TabNav />
        <UnderMenu />
        <RouterView />
      </main>
    </div>
    <CreateEntityWizard/>
  </div>
</template>

<style scoped lang="scss">
.body_container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  //border: 1px solid red;

  .main_container {
    flex: 1;
    display: flex;
    justify-content: space-around;
    //border: 1px solid blue;

    main {
      max-width: min(1280px, calc(100% - 3rem));
      flex: 1;
      //border: 1px solid blueviolet;
    }
  }
}
</style>
