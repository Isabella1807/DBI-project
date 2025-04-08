<script setup lang="ts">
import BasicIcon from '@/components/BasicIcon.vue';

interface Props {
  iconName: string,
  label: string,
  link: string,
}

const props = defineProps<Props>();

</script>

<template>
  <RouterLink :to="props.link" class="link" v-slot="{isActive}">
    <div class="tabItem">
      <BasicIcon :name="props.iconName" :selected="isActive"/>
      <p :class="{'selected': isActive}">{{ props.label }}</p>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  @include noLinkDeco;
  &.router-link-active {
    .tabItem {
      background-color: $white;
      border-radius: 10px 10px 0 0;
      position: relative;
      &::before, &::after{
        content:'';
        position: absolute;
        width: 16px;
        height: 16px;
        bottom: 0;
      }
      &::before{
        left: -16px;
        background-image: radial-gradient(circle at 0 0, transparent 16px, $white 16px);
      }
      &::after{
        right: -16px;
        background-image: radial-gradient(circle at 100% 0, transparent 16px, $white 16px);
      }
    }
  }
}

.tabItem {
  padding: 8px 12px 16px 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    @include heading2;

    &.selected {
      @include fatBodyText;
    }
  }
}
</style>
