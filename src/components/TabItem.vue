<script setup lang="ts">
import BasicIcon from '@/components/BasicIcon.vue';

interface Props {
  iconName: string,
  label: string,
  selected?: boolean,
}
const props = defineProps<Props>();

</script>

<template>
<div class="tabItem">
  <BasicIcon :name="props.iconName" :selected="props.selected" />
  <p :class="{'selected': props.selected}">{{props.label}}</p>
</div>
</template>

<style scoped lang="scss">
.tabItem{
  display: flex;
  align-items: center;
  p{
    @include heading2;
    &.selected{
      @include fatBodyText;
    }
  }
}
</style>
