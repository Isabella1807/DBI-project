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
</script>

<template>
  <div class="confirmModalContainer">
    <div class="textContainer">
      <BasicIcon :name="props.iconName" v-if="props.iconName" large/>
      <p class="titleText" v-if="title">{{ props.title }}</p>
      <p class="descriptionText" v-if="description">{{ props.description }}</p>
      <p class="noteText" v-if="note">{{ props.note }}</p>
    </div>
    <div class="buttonsContainer">
      <BasicButton ariaLabel="Annuller" :label="props.cancelText" type="annuller"/>
      <BasicButton ariaLabel="afslut" :label="props.confirmText"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirmModalContainer {
  padding: 3rem;
  border: 1px solid blue;
  display: inline-block;
  .textContainer {
    text-align: center;
  }
  .buttonsContainer {
    justify-content: space-between;
    display: flex;
    gap: 2rem;
  }
}
</style>
