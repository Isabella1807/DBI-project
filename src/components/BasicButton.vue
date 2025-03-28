<template>
    <button class="basicButton">
        <p>Opret</p>
        <span class="plusIcon">+</span>
    </button>
</template>

<script setup>
</script>

<style scoped lang="scss">

p {
    @include buttonText;
    text-transform: uppercase;
}

.basicButton {
    background-color: $black;
    color: $white;
    border: none;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    @include buttonText;

    &:hover {
        background-color: $mediumGreen;
    }

    &:active {
        background-color: $darkGreen;
    }
}

.plusIcon {
    font-size: 16px;
}
</style>
