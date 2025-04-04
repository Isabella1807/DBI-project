<script setup lang="ts">
import BasicIcon from '@/components/BasicIcon.vue';
import TabItem from '@/components/TabItem.vue';
</script>

<template>
  <div class="navContainer">
    <div class="tabsContainer">
      <RouterLink to="" class="link">
        <TabItem icon-name="Monitor" label="Dashboard"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="File_document" label="Rapporter"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="Notebook" label="Skemaer"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="Users_Group" label="Brugere"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="Qr_Code" label="Enheder"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="Files" label="Dokumenter"/>
      </RouterLink>
      <RouterLink to="" class="link">
        <TabItem icon-name="Calendar_Days" label="Kalender"/>
      </RouterLink>
    </div>
    <div class="userContainer">
      <BasicIcon name="User_02"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navContainer {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 56px;

  .tabsContainer {
    display: flex;
    gap: 24px;
    position: relative;
    justify-content: center;
    width: 100%;
  }

  .userContainer {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
  }
}

.link {
  text-decoration: none;
  text-underline: none;
  color: $black;
}
</style>
