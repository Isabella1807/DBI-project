<script setup lang="ts">
import {useWizardStore} from '@/stores/wizard.ts';
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
  <div class="card" :class="{inBackground: !isCurrentPage}" @click.prevent.stop="() => {}">
    <div class="content">
      <h1 class="cardTitle">{{ props.title }}</h1>
      <slot>
        <h2>DEFAULT CARD {{ props.page }}</h2>
      </slot>
    </div>
    <BasicButton label="secondary" type="secondary" active showIcon iconName="Chevron_Right"/>
    <BasicButton label="lukNed" type="lukNed"/>
    <BasicButton label="default" type="default"/>
    <BasicButton label="annuller" type="annuller"/>
    <BasicButton label="default" type="default"/>
    <div class="buttons">
      <button v-if="hasCancelButton" :disabled="!isCurrentPage" @click="wizardStore.close()">
        CANCEL
      </button>
      <button v-else :disabled="!isCurrentPage" @click="wizardStore.previous()">BACK</button>
      <button v-if="hasSubmitButton" :disabled="!isCurrentPage || !canContinue"
              @click="wizardStore.submit()">SUBMIT
      </button>
      <button v-else :disabled="!isCurrentPage || !canContinue" @click="wizardStore.next()">NEXT
      </button>
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
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 3rem 3rem 3rem;
  cursor: default;
  border-radius: 20px;

  .content {
    .cardTitle {
      @include heading1;
      margin-bottom: 2.5rem;
    }
  }

  .buttons {
    cursor: pointer;
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
