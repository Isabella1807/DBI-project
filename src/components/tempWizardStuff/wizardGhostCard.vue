<script setup lang="ts">

import WizardCard from '@/components/tempWizardStuff/wizardCard.vue';
</script>

<template>
  <wizard-card title="" class="ghost"/>
</template>

<style scoped lang="scss">
.card.ghost {
  opacity: 0;
  pointer-events: none;
}
</style>
