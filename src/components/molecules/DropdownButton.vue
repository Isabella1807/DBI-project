<script setup lang="ts">
import {ref} from 'vue';
import BasicButton from '../atoms/BasicButton.vue';
import BasicIcon from '../atoms/BasicIcon.vue';
import { useWizardStore } from '@/stores/wizard.ts';

const wizardStore = useWizardStore();

const props = defineProps({
  label: {type: String, required: true},
  type: {type: String, required: true},
  iconName: {type: String, required: true},
  ariaLabel: {type: String, required: true},
  options: {
    type: Array as () => { label: string; icon: string }[],
    required: true,
  },
});


const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function handleOptionClick(option: string) {
  console.log('Valgte:', option);
  showDropdown.value = false;
  if(option === 'Enhed'){
    wizardStore.open();
  }
}
</script>

<template>
  <div class="dropdown-wrapper">
    <BasicButton :label="label" :type="type" :iconName="iconName" :active="showDropdown" @click="toggleDropdown" :ariaLabel="ariaLabel"/>

    <ul v-if="showDropdown" class="dropdown-menu">
      <li v-for="(option, index) in options" :key="index" @click="handleOptionClick(option.label)">
        <BasicIcon :name="option.icon" class="dropdown-icon"/>
        {{ option.label }}
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
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: $lightGreen;
    }

  }
}
</style>
