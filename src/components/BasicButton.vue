<template>
    <button :class="difftentButton">
        <p>{{ label }}</p>
        <span class="plusIcon" v-if="showIcon">+</span>
    </button>
</template>

<script setup>
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

<style scoped lang="scss">

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

.plusIcon {
    font-size: 16px;
}
</style>
