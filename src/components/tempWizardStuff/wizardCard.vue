<script setup lang="ts">
import {useWizardStore} from '@/stores/wizard.ts';
import {computed} from 'vue';

const wizardStore = useWizardStore();

interface Props {
  page?: number,
  title: string,
}

const props = defineProps<Props>();

const isCurrentPage = computed(() => props.page === wizardStore.currentPage);

const hasCancelButton = computed(() => props.page === 0);
const hasSubmitButton = computed(() => props.page === (wizardStore.totalPages - 1));
</script>

<template>
  <div class="card" :class="{inBackground: !isCurrentPage}" @click.prevent.stop="() => {}">
    <h1>{{ props.title }}</h1>
    <slot>
      <h2>DEFAULT CARD {{ props.page }}</h2>
    </slot>
    <div class="buttons">
      <button v-if="hasCancelButton" :disabled="!isCurrentPage" @click="wizardStore.close()">CANCEL</button>
      <button v-else :disabled="!isCurrentPage" @click="wizardStore.previous()">BACK</button>
      <button v-if="hasSubmitButton" :disabled="!isCurrentPage" @click="wizardStore.submit()">SUBMIT</button>
      <button v-else :disabled="!isCurrentPage" @click="wizardStore.next()">NEXT</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: calc(max(min(30vw, 640px), min(420px, 95vw)));
  background-color: orange;
  aspect-ratio: 1;
  overflow: hidden;
  margin: 0 2.5rem;
  transition: all 0.2s linear;

  &.inBackground {
    background-color: #00b0ff;
    //transform: scale(0.85);
  }
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
  margin: 0;
}
</style>
