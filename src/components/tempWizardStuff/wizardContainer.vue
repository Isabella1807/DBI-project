<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import WizardGhostCard from '@/components/tempWizardStuff/wizardGhostCard.vue';
import WizardCard from '@/components/tempWizardStuff/wizardCard.vue';

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
  <div class="wrapper" @click="wizardStore.close()">
    <div class="container" ref="containerRef">
      <TransitionGroup name="slide">
        <template v-if="ghostsBeforeWizard">
          <wizardGhostCard v-for="i in ghostsBeforeWizard" :key="`${i}_before`"/>
        </template>
        <slot/>
        <template v-if="ghostsAfterWizard">
          <wizardGhostCard v-for="i in ghostsAfterWizard" :key="`${i}_after`"/>
        </template>
      </TransitionGroup>
    </div>
    <div class="container forCloseButton">
      <wizardCard title="" class="closeButtonAnchor">
        <div class="closeButton" @click="wizardStore.close()">x</div>
      </wizardCard>
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
  cursor: pointer;

  .container.forCloseButton {
    pointer-events: none;
    .closeButtonAnchor {
      visibility: hidden;

      .closeButton {
        pointer-events: all;
        width: 40px;
        height: 40px;
        background-color: #222222;
        position: absolute;
        top: -3rem;
        right: -0.5rem;
        visibility: visible;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: white;
        transition: transform 0.2s;
        padding-bottom: 4px;
        cursor: pointer;
        &:hover {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
</style>
