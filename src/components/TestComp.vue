<script setup lang="ts">

import BasicIcon from '@/components/BasicIcon.vue';
import TabItem from '@/components/TabItem.vue';
</script>

<template>
<h1>HEJSA</h1>
  <BasicIcon name="Qr_Code" selected/>
  <BasicIcon name="Qr_Code" large/>

  <TabItem icon-name="Qr_Code" label="Enheder"/>
  <TabItem icon-name="Qr_Code" label="Enheder" selected/>
</template>

<style scoped lang="scss">
h1{
  @include heading1;
}
</style>
