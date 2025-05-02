<script setup lang="ts">
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { ref } from 'vue';

const props = defineProps({
  folderId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['optionSelected']);

const showDropdown = ref(false);

const options = [
  { label: 'Rediger', icon: 'EditPencil' },
  { label: 'Kopier', icon: 'Copy' },
  { label: 'Flyt', icon: 'ArrowUpRight' },
  { label: 'Send til print', icon: 'Printer' },
  { label: 'Slet', icon: 'Trash' }
];

const toggleDropdown = (event: Event) => {
  event.stopPropagation();
  showDropdown.value = !showDropdown.value;
};

const handleOptionClick = (option: string) => {
  emit('optionSelected', { folderId: props.folderId, action: option });
  showDropdown.value = false;
};
</script>

<template>
  <div class="menu-dots-container">
    <button class="menuDots" @click="toggleDropdown">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <Transition name="dropdown">
      <ul v-if="showDropdown" class="dropdown-menu">
        <li v-for="(option, index) in options"
            :key="index"
            @click="handleOptionClick(option.label)">
          <BasicIcon :name="option.icon" class="dropdown-icon"/>
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.menu-dots-container {
  position: relative;
  display: inline-block;
}

.menuDots {
  display: flex;
  flex-direction: row;
  gap: 3px;
  width: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    width: 4px;
    height: 4px;
    background-color: $black;
    border-radius: 50%;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: $white;
  border: none;
  padding: 8px 0;
  margin-top: 4px;
  list-style: none;
  z-index: 100;
  width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: $lightGreen;
    }
  }
}

/* Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
