<script setup lang="ts">
import {useWizardStore} from '@/stores/wizardStore.ts';
import {computed} from 'vue';
import BasicButton from '@/components/atoms/BasicButton.vue';

const wizardStore = useWizardStore();

interface Props {
  page?: number,
  title: string,
  canContinue?: boolean,
}

const props = defineProps<Props>();

const isCurrentPage = computed(() => props.page === wizardStore.currentPage);
const hasCancelButton = computed(() => props.page === 0);
const hasSubmitButton = computed(() => props.page === (wizardStore.totalPages - 1));

</script>

<template>
  <div class="card" :class="{inBackground: !isCurrentPage, skipAnimation: !wizardStore.isReady}" @click.prevent.stop="() => {}">
    <div class="content">
      <h1 class="cardTitle">{{ props.title }}</h1>
      <slot>
        <h2>DEFAULT CARD {{ props.page }}</h2>
      </slot>
    </div>
    <div class="buttons">
      <BasicButton ariaLabel="Annuller og luk" label="Annuller" type="secondary" v-if="hasCancelButton" :disabled="!isCurrentPage" @click="wizardStore.close()"/>
      <BasicButton ariaLabel="Gå tilbage til forrige trin" label="Tilbage" type="default" v-else :disabled="!isCurrentPage" @click="wizardStore.previous()"/>
      <BasicButton ariaLabel="Udfør" label="Udfør" type="default" showIcon iconName="Chevron_Right" v-if="hasSubmitButton" :disabled="!isCurrentPage || !canContinue" @click="wizardStore.submit()"/>
      <BasicButton ariaLabel="Videre til næste trin" label="Videre" type="default" showIcon iconName="Chevron_Right" v-else :disabled="!isCurrentPage || !canContinue" @click="wizardStore.next()"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: calc(max(min(30vw, 640px), min(420px, 95vw)));
  background-color: $white;
  aspect-ratio: 1;
  overflow: hidden;
  margin: 0 2.5rem;
  transition: width 0.2s linear, margin 0.2s linear;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 3rem 3rem 3rem;
  cursor: default;
  border-radius: 20px;

  &.skipAnimation {
    transition: all 0s;
    opacity: 0;
  }
  .content {
    .cardTitle {
      @include heading1;
      margin-bottom: 2.5rem;
    }
  }

  .buttons {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  &.inBackground {
    //background-color: #00b0ff;
    //transform: scale(0.85);
    cursor: not-allowed;

    .buttons {
      cursor: not-allowed;
    }

    .content {
      pointer-events: none;
    }
  }
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
  margin: 0;
}
</style>
