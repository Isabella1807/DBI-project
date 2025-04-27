<script setup lang="ts">
import WizardContainer from '@/components/organisms/wizardContainer.vue';
import WizardCard from '@/components/molecules/wizardCard.vue';

import {useWizardStore} from '@/stores/wizard.ts';
import BasicInput from '@/components/atoms/BasicInput.vue';
import {ref, watch} from 'vue';

const wizardStore = useWizardStore();

const errorMessage = ref('');

const onInputBlur = () => {
  if(!wizardStore.entityName) {
    errorMessage.value = 'Enhed mangler navn';
  }
};
watch(() => wizardStore.entityName, () => {
  errorMessage.value = '';
});
watch(() => wizardStore.isOpen, () => {
  errorMessage.value = '';
});
</script>

<template>
  <wizardContainer v-if="wizardStore.isOpen">
    <wizardCard :page="0" title="Navngiv enhed" :canContinue="wizardStore.entityName.length > 0">
      <BasicInput type="text" label="Navn" labelId="Name" placeholder="Skriv her..."
                  v-model="wizardStore.entityName" @blur="onInputBlur"
                  :autoFocus="wizardStore.currentPage===0"/>
      <div class="errorContainer" v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
    </wizardCard>

    <wizardCard :page="1" title="Beskrivelse" :canContinue="true">
      <BasicInput label="Tilføj beskrivelse af enhed" labelId="description"
                  placeholder="Skriv her..." type="textarea" v-model="wizardStore.entityDescription"
                  :autoFocus="wizardStore.currentPage===1"/>
    </wizardCard>

    <wizardCard :page="2" title="Extern sync ID" :canContinue="true">
      <BasicInput label="Tilføj ekstern sync ID" labelId="sync" placeholder="Skriv her..."
                  v-model="wizardStore.entitySyncId" :autoFocus="wizardStore.currentPage===2"/>
    </wizardCard>
  </wizardContainer>
</template>

<style scoped lang="scss">
.errorContainer {
  color: red;
  margin-top: 0.51rem;
}
</style>
