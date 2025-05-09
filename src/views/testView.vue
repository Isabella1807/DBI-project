<script setup lang="ts">
import { ref } from 'vue'
import UnderMenu from '@/components/organisms/UnderMenu.vue'
import MellemLedet from '@/components/molecules/MellemLedet.vue'

const showCreateDialog = ref(false)

function onCreateOption(opt: string) {
  if (opt === 'Mappe') showCreateDialog.value = true
}
</script>

<template>
  <UnderMenu @option-selected="onCreateOption" />
  <MellemLedet v-model:showCreateDialog="showCreateDialog" />
</template>