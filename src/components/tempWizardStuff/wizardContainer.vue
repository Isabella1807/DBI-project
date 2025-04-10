<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import WizardGhostCard from '@/components/tempWizardStuff/wizardGhostCard.vue';

import {useWizardStore} from '@/stores/wizard.ts';

const wizardStore = useWizardStore();

const containerRef = ref(null);

const mounted = ref(false);

onMounted(() => {
  wizardStore.setLength(containerRef.value!.children?.length);
  mounted.value = true;
});

const ghostsBeforeWizard = computed(() => {
  return mounted.value ? Math.max(0, (wizardStore.totalPages - 1) - wizardStore.currentPage) : 0;
});

const ghostsAfterWizard = computed(() => {
  return mounted.value ? Math.max(0, wizardStore.currentPage) : 0;
});

</script>

<template>
  <div class="wrapper" @click="wizardStore.close()" v-if="wizardStore.isOpen">
    <div class="container" ref="containerRef">
      <TransitionGroup name="slide" mode="out-in" :duration="1000">
        <template v-if="ghostsBeforeWizard">
          <wizard-ghost-card v-for="i in ghostsBeforeWizard" :key="`${i}_before`"/>
        </template>
        <slot/>
        <template v-if="ghostsAfterWizard">
          <wizard-ghost-card v-for="i in ghostsAfterWizard" :key="`${i}_after`"/>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
  transition: background-color 0.2s;
}

.container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
</style>
