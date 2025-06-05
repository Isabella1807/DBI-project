<script setup lang="ts">
import TabItem from '@/components/molecules/TabItem.vue';
import AvatarIcon from '@/components/atoms/AvatarIcon.vue';
import { useAuthStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  await authStore.logout();
  router.push('/');
}
</script>

<template>
  <div class="navContainer">
    <div class="tabsContainer">
      <TabItem icon-name="Monitor" label="Dashboard" link="/dashboard"/>
      <TabItem icon-name="File_Document" label="Rapporter" link="rapporter"/>
      <TabItem icon-name="Notebook" label="Skemaer" link="skemaer"/>
      <TabItem icon-name="Users_Group" label="Brugere" link="Brugere"/>
      <TabItem icon-name="Qr_Code" label="Enheder" link="enheder"/>
      <TabItem icon-name="Files" label="Dokumenter" link="Dokumenter"/>
      <TabItem icon-name="Calendar_Days" label="Kalender" link="Kalender"/>
    </div>
    <div class="userContainer">
      <AvatarIcon @click="handleLogout"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navContainer {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  padding-top: 8px;

  .tabsContainer {
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
  }

  .userContainer {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    cursor: pointer;

    :hover {
      color: $white;
      background-color: $mediumGreen;
    }
  }
}
</style>
