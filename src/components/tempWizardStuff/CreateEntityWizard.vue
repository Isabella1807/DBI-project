<script setup lang="ts">
import WizardContainer from '@/components/tempWizardStuff/wizardContainer.vue';
import WizardCard from '@/components/tempWizardStuff/wizardCard.vue';

import { useWizardStore } from '@/stores/wizard.ts';
const wizardStore = useWizardStore();
</script>

<template>
  <wizard-container v-if="wizardStore.isOpen">
    <wizard-card :page="0" title="Navngiv enhed" :canContinue="wizardStore.entityName.length > 0">
      <input type="text" v-model="wizardStore.entityName" placeholder="Skriv her..."/>
    </wizard-card>
    <wizard-card :page="1" title="Beskrivelse" :canContinue="true">
      <textarea type="text" v-model="wizardStore.entityDescription"/>
    </wizard-card>
    <wizard-card :page="2" title="Extern sync ID" :canContinue="true">
      <input type="text" v-model="wizardStore.entitySyncId"/>
    </wizard-card>
  </wizard-container>
</template>

<style scoped lang="scss">

</style>
