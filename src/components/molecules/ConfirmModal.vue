<script setup lang="ts">

import BasicIcon from '@/components/atoms/BasicIcon.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';

interface Props {
  iconName?: string,
  title?: string,
  description?: string,
  note?: string,
  cancelText: string,
  confirmText: string,
}

const props = defineProps<Props>();
const emit = defineEmits(['cancel', 'confirm']);
</script>

<template>
  <div class="modalBackdrop">
    <div class="confirmModalContainer">
      <div class="textContainer">
        <BasicIcon :name="props.iconName" v-if="props.iconName" large/>
        <p class="titleText" v-if="title">{{ props.title }}</p>
        <p class="descriptionText" v-if="description">{{ props.description }}</p>
        <p class="noteText" v-if="note">{{ props.note }}</p>
      </div>
      <div class="buttonsContainer">
        <BasicButton ariaLabel="Annuller" :label="props.cancelText" type="annuller" @click="emit('cancel', $event)"/>
        <BasicButton ariaLabel="afslut" :label="props.confirmText" @click="emit('confirm', $event)"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modalBackdrop{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  .confirmModalContainer {
    padding: 4rem 3rem 3rem 3rem;
    display: inline-block;
    background-color: $white;
    border-radius: 18px;

    .textContainer {
      text-align: center;
      padding-bottom: 2rem;

      .titleText {
        @include heading1;
        margin-bottom: 1rem;
      }

      .descriptionText {
        @include fatBodyText;
        margin-bottom: 0.2rem;
      }

      .noteText {
        @include bodyText;
      }
    }
    .buttonsContainer {
      justify-content: space-between;
      display: flex;
      gap: 2rem;
    }
  }

}
</style>
