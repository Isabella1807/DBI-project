<script setup lang="ts">
import { ref } from 'vue'
import BasicButton from './BasicButton.vue'

const props = defineProps({
    label: String,
    type: String,
    iconName: String,
    options: {
        type: Array as () => string[],
        required: true
    }
})

const showDropdown = ref(false)

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function handleOptionClick(option: string) {
    console.log('Valgte:', option)
    showDropdown.value = false
}
</script>

<template>
    <div class="dropdown-wrapper">
        <BasicButton :label="label" :type="type" :iconName="iconName" @click="toggleDropdown" />

        <ul v-if="showDropdown" class="dropdown-menu">
            <li v-for="(option, index) in options" :key="index" @click="handleOptionClick(option)">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: $white;
    border: none;
    padding: 0;
    margin-top: 4px;
    list-style: none;
    z-index: 10;
    width: 200px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    li {
        padding: 10px;
        cursor: pointer;

        &:hover {
            background: $lightGreen;
        }
    }
}
</style>
