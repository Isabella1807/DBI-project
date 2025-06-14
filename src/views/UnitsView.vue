<script setup lang="ts">
import { ref } from 'vue';
import UnderMenu from '@/components/organisms/UnderMenu.vue';
import Breadcrumb from '@/components/molecules/BreadcrumbComp.vue';
import BulkEditor from '@/components/organisms/BulkEditor.vue';
import { useWizardStore } from '@/stores/wizardStore.ts';

const wizardStore = useWizardStore();
const showCreateDialog = ref(false);

function onCreateOption(option: string) {
  if (option === 'Mappe') showCreateDialog.value = true;

  if (option === 'Enhed') wizardStore.open();
}
</script>

<template>
  <UnderMenu @option-selected="onCreateOption" />
  <Breadcrumb />
  <BulkEditor v-model:showCreateDialog="showCreateDialog" />
</template>
