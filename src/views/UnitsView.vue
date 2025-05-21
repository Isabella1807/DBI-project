<script setup lang="ts">
import { ref } from 'vue';
import UnderMenu from '@/components/organisms/UnderMenu.vue';
import Breadcrumb from '@/components/molecules/BreadcrumbComp.vue';
import BulkEditor from '@/components/organisms/BulkEditor.vue';

const showCreateDialog = ref(false);

function onCreateOption(opt: string) {
  if (opt === 'Mappe') showCreateDialog.value = true;
}
</script>

<template>
  <UnderMenu @option-selected="onCreateOption" />
  <Breadcrumb />
  <BulkEditor v-model:showCreateDialog="showCreateDialog" />
</template>
