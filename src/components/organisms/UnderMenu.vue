<script setup lang="ts">
import DropdownButton from '@/components/molecules/DropdownButton.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';

// Now correctly expect a string payload
const emit = defineEmits<{
  (e: 'option-selected', label: string): void
}>();

// Accept a string, not an object
function onOptionSelected(label: string) {
  emit('option-selected', label);
}
</script>

<template>
  <div class="toolbar-wrapper">
    <div class="toolbar-container">
      <DropdownButton
        label="Opret"
        type="default"
        iconName="PlusIcon"
        ariaLabel="Opret"
        :options="[
          { label: 'Mappe', icon: 'Folder' },
          { label: 'Enhed', icon: 'Qr_Code' }
        ]"
        @option-selected="onOptionSelected"
      />
      <SearchBar />
      <DropdownButton
        label="Eksporter"
        type="secondary"
        iconName="ShareExport"
        ariaLabel="Eksporter"
        :options="[
          { label: 'Hent som PDF', icon: 'File' },
          { label: 'Hent som CSV', icon: 'Table' },
          { label: 'Send til printer kø', icon: 'Printer' }
        ]"
      />
    </div>
  </div>
</template>


<style scoped lang="scss">
.toolbar-wrapper {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    background: $white;

    .toolbar-container {
        max-width: 1310px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
