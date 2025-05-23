<script setup lang="ts">
import WizardCard from '@/components/molecules/WizardCard.vue';
</script>

<template>
  <wizardCard title="" class="ghost"/>
</template>

<style scoped lang="scss">
.card.ghost {
  opacity: 0;
  pointer-events: none;
}
</style>
