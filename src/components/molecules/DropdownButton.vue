<script setup lang="ts">
import { ref } from 'vue';
import BasicButton from '../atoms/BasicButton.vue';
import BasicIcon from '../atoms/BasicIcon.vue';
import { useWizardStore } from '@/stores/wizard.ts';

const wizardStore = useWizardStore();

const props = defineProps({
  label:      { type: String, required: true },
  type:       { type: String, required: true },
  iconName:   { type: String, required: true },
  ariaLabel:  { type: String, required: true },
  options:    {
    type: Array as () => { label: string; icon: string }[],
    required: true,
  },
});

// ← emit option-selected(label: string)
const emit = defineEmits<{
  (e: 'option-selected', label: string): void
}>();

const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function handleOptionClick(optionLabel: string) {
  showDropdown.value = false;

  // emit up to parent
  emit('option-selected', optionLabel);

  // your existing wizard logic
  if (optionLabel === 'Enhed') {
    wizardStore.open();
  }
}
</script>

<template>
  <div class="dropdown-wrapper">
    <BasicButton
      :label="props.label"
      :type="props.type"
      :iconName="props.iconName"
      :active="showDropdown"
      @click="toggleDropdown"
      :ariaLabel="props.ariaLabel"
    />

    <ul v-if="showDropdown" class="dropdown-menu">
      <li
        v-for="(opt, idx) in options"
        :key="idx"
        @click="handleOptionClick(opt.label)"
      >
        <BasicIcon :name="opt.icon" class="dropdown-icon"/>
        {{ opt.label }}
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
