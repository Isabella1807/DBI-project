<script setup lang="ts">
import InlineSvg from 'vue-inline-svg';
import {computed} from 'vue';

interface Props {
  name: string,
  selected?: boolean,
  large?: boolean,
  huge?: boolean,
  small?: boolean,
}

const props = defineProps<Props>();

const filePath = computed(() => {
  return `/icons/${props.name}.svg`;
});
</script>

<template>
  <InlineSvg
    :props="{
        src: filePath,
        title: props.name,
        keepDuringLoading: true,
      }"
    :src="filePath"
    :class='{"selected":props.selected, "large":props.large, "huge":props.large, "small":props.small}'
  />
</template>

<style scoped lang="scss">
svg {
  display: inline-block;
  stroke-width: 2;
  color: $black;
  &.selected{
    stroke-width: 2.5;
  }
  &.huge{
    width:80px;
    height: 80px;
  }
  &.large{
    width: 38px;
    height: 38px;
  }
  &.small{
    width: 16px;
    height: 16px;
  }
}
</style>
