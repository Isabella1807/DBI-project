<script setup lang="ts">
import BasicIcon from '@/components/atoms/BasicIcon.vue';

import {computed} from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'default',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  iconName: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const difftentButton = computed(() => {
  return {
    basicButton: props.type === 'default' && !props.active,
    secondaryButton: props.type === 'secondary' && !props.active,
    annullerButton: props.type === 'annuller',
    lukNedButton: props.type === 'lukNed',
    activeButton: props.type === 'default' && props.active,
    activeSecondaryButton: props.type === 'secondary' && props.active,
    disabledButton: props.disabled === true,
  };
});
</script>

<template>
  <button :class="[difftentButton, {disabledButton: props.disabled }]">
    <p>{{ label }}</p>
    <BasicIcon v-if="showIcon && iconName" :name="iconName"/>
  </button>
</template>

<style scoped lang="scss">
.activeSecondaryButton {
  background-color: $darkGreen !important;
  color: $white !important;

  svg {
    color: $white !important;
  }
}

.activeButton {
  background-color: $darkGreen !important;
  color: $white;
  border: none;
}

svg {
  color: $white
}

p {
  @include buttonText;
  text-transform: uppercase;
}

button {
  display: flex;
  align-items: center;
  padding: 20px 32px;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.basicButton {
  background-color: $black;
  color: $white;
  border: none;

  &:hover {
    background-color: $mediumGreen;
  }
}

.secondaryButton {
  background-color: $white;
  color: $black;
  border-radius: 2px;
}

.annullerButton {
  background-color: $white;
  color: $black;
}

.lukNedButton {
  background-color: $black;
  color: $white;
  border: none;

  &:hover {
    background-color: $mediumGreen;
  }
}
.disabledButton{
  opacity: 0.25;
  pointer-events: none;
}
</style>
