<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';

interface Props {
  name: string;
  icon?: string;
  isUnit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'Folder',
  isUnit: false,
});
</script>

<template>
  <div class="folderContent" :class="{ 'unit-style': props.isUnit }">
    <BasicIcon :name="props.isUnit ? 'Unit' : props.icon" class="huge" />
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
