<script setup lang="ts">
import {onMounted} from 'vue';
import WizardContainer from '@/components/tempWizardStuff/wizardContainer.vue';
import WizardCard from '@/components/tempWizardStuff/wizardCard.vue';

import { useWizardStore } from '@/stores/wizard.ts';
const wizardStore = useWizardStore();

onMounted(() => {
  wizardStore.reset();
});
</script>

<template>
  <wizard-container>
    <wizard-card :page="0" title="Navngiv enhed"></wizard-card>
    <wizard-card :page="1" title="Beskrivelse">HEJ 2</wizard-card>
    <wizard-card :page="2" title="Extern sync ID">HEJ 3</wizard-card>
    <wizard-card :page="3" title="Rettigheder">HEJ 4</wizard-card>
  </wizard-container>
</template>

<style scoped lang="scss">
</style>
