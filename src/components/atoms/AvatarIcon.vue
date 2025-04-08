<script setup lang="ts">
import BasicIcon from '@/components/atoms/BasicIcon.vue';
</script>

<template>
  <div class="avatarContainer">
    <BasicIcon name="User_02" class="avatar"/>
  </div>
</template>

<style scoped lang="scss">
.avatarContainer {
  border-radius: 50px;
  background-color: $black;
  padding: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .avatar {
    color: $white;
  }
}

</style>
