<script setup lang="ts">
import FolderForm from '@/components/FolderForm.vue';
import MellemLedet from '@/components/molecules/MellemLedet.vue';

import {onMounted} from 'vue';
import entityService from '@/services/entityService.ts';

onMounted(() => {
  entityService.createEntity('tester', '12f45');
});
</script>

<template>
  <div>
    <H1>
      TESTER VIEW 1
    </H1>
    <MellemLedet/>
    <FolderForm/>
  </div>
</template>

<style scoped lang="scss">

</style>
