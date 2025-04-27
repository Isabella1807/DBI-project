<script setup lang="ts">

import BasicIcon from '@/components/atoms/BasicIcon.vue';
import TabItem from '@/components/molecules/TabItem.vue';
</script>

<template>
<h1>HEJSA</h1>
  <BasicIcon name="Qr_Code" selected/>
  <BasicIcon name="Qr_Code" large/>
  <BasicIcon name="Notebook" small/>

  <TabItem icon-name="Qr_Code" label="Enheder"/>
  <TabItem icon-name="Qr_Code" label="Enheder" selected/>
  <!--  <TabItem icon-name="" label="hkkjkjjk"/>-->
</template>

<style scoped lang="scss">
h1{
  @include heading1;
}
</style>
