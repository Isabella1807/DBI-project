<script setup lang="ts">
import {createUnit} from '@/services/unitService.ts';

const onklik = () => {
  createUnit({name: 'Megao', syncId: 'sdsadsadsads', description: 'beskrivelsewooow', parentId: '1223346'});
};
</script>

<template>
<button @click="onklik">Hejsa muller</button>
</template>

<style scoped lang="scss">

</style>
