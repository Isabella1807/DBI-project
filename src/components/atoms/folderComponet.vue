<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';

</script>

<template>

<div class="folder">
  <div class="folder-content">
    <BasicIcon name="Folder" />
    <p>{{ }}</p>
  </div>
</div>

</template>

<style lang="scss" scoped>

.folder-content {
  display: flex;
  width: 180px;
  height: 180px;
  padding: 40px 42px 11px 42px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.10);
  border-radius: 16px;
  background: $white;

svg {
  flex-shrink: 0;
  }

p {
  @include bodyText;
  text-align: center;
  width: 96px;
  height: 39px;
  flex-shrink: 0;
  }
}

</style>