<script setup lang="ts">
import BasicIcon from '@/components/BasicIcon.vue';

import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'default'
    },
    showIcon: {
        type: Boolean,
        default: true
    },
    iconName: {
        type: String,
        default: ''
    }
});

const difftentButton = computed(() => {
    return {
        basicButton: props.type === 'default',
        secondaryButton: props.type === 'secondary',
        annullerButton: props.type === 'annuller',
        lukNedButton: props.type === 'lukNed',
    };
});
</script>

<template>
    <button :class="difftentButton">
      <p>{{ label }}</p>
      <BasicIcon v-if="showIcon && iconName" :name="iconName" />
    </button>
  </template>
  
<style scoped lang="scss">

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

    &:active {
        background-color: $darkGreen;
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
</style>
