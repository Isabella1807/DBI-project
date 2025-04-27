<script setup lang="ts">

import ConfirmModal from '@/components/molecules/ConfirmModal.vue';
</script>

<template>
  <ConfirmModal
    iconName="Circle_Warning"
    title="Det ser ud til, du ikke er færdig"
    description="Ændringer vil ikke blive gemt"
    note="Vil du afslutte alligevel?"
    cancelText="Annuller"
    confirmText="Ja - afslut og luk ned"
  />
</template>

<style scoped lang="scss">
</style>
