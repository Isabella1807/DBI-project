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
<div>
  <BasicIcon :name="props.iconName" v-if="props.iconName"/>
  <p v-if="title">{{props.title}}</p>
  <p v-if="description">{{props.description}}</p>
  <p v-if="note">{{props.note}}</p>
  <BasicButton ariaLabel="Annuller" :label="props.cancelText" type="annuller" />
  <BasicButton ariaLabel="afslut" :label="props.confirmText"/>
</div>
</template>

<style scoped lang="scss">

</style>
