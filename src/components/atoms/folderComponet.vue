<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';


defineProps<{ name: string }>()
</script>

<template>
  <div class="folderContent">
    <BasicIcon name="Folder" class="huge" />
    <p>{{ name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.folderContent {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  background: $white;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  svg {
    flex-shrink: 0;
    color: $darkGrey;
  }

  p {
    text-align: center;
    margin-top: 8px;
    @include bodyText;
  }
}
</style>
