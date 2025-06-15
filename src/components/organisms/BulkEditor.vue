<!-- src/components/molecules/BulkEditor.vue -->
<script setup lang="ts">
import BasicIcon from '../atoms/BasicIcon.vue';
import FolderSection from '@/components/organisms/FolderSection.vue';
import {ref, provide, onMounted, computed, type Ref} from 'vue';

const props = defineProps({
  showCreateDialog: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:showCreateDialog', v: boolean): void
  (e: 'selection-changed', count: number): void
}>();

function update(v: boolean) {
  emit('update:showCreateDialog', v);
}

const folderSection: Ref<{toggleAllItemsSelection: () => void, totalAmountOfItemsOnScreen: number, totalAmountOfItemsSelected: number} | null> = ref(null);

const toggleAllItemsSelection = () => {
  if (folderSection.value) {
    folderSection.value.toggleAllItemsSelection();
  }
};

const totalAmountOfItemsOnScreen = computed(() => {
  if (!folderSection.value) return 0;
  return folderSection.value.totalAmountOfItemsOnScreen;
});

const totalAmountOfItemsSelected = computed(() => {
  if (!folderSection.value) return 0;
  return folderSection.value.totalAmountOfItemsSelected;
});

const everythingIsSelected = computed(() => totalAmountOfItemsOnScreen.value > 0 && totalAmountOfItemsOnScreen.value === totalAmountOfItemsSelected.value);

const isAllSelected = ref(false);
provide('isAllSelected', isAllSelected);

const anySelected = ref(false);
function handleSelectionChanged(count: number) {
  anySelected.value = count > 0;
  isAllSelected.value = count === 10;
}

const savedView = localStorage.getItem('currentView');
const currentView = ref(savedView || 'detailed');
function toggleView(v: string) {
  currentView.value = v;
  localStorage.setItem('currentView', v);
}
provide('currentView', currentView);
provide('toggleView', toggleView);

onMounted(() => {
  if (!['list','detailed'].includes(currentView.value)) {
    currentView.value = 'detailed';
    localStorage.setItem('currentView','detailed');
  }
});


// tri‐state: none, asc, desc
const sortDirection = ref<'none' | 'asc' | 'desc'>('none')

function onSortToggle() {
  sortDirection.value =
    sortDirection.value === 'none'
      ? 'asc'
      : sortDirection.value === 'asc'
      ? 'desc'
      : 'none'
}


</script>

<template>
  <div class="tableNav">
    <!-- Venstre side: markér alt, rediger, kopier, osv. -->
    <div class="leftSection">
      <div class="tableNavItem" :class="{ checked: everythingIsSelected, disabled: !totalAmountOfItemsOnScreen }" @click.stop="toggleAllItemsSelection">
        <input
          type="checkbox"
          id="selectAll"
          class="customCheckbox"
          :checked="everythingIsSelected"
        />
        <label for="selectAll">Markér alt</label>
      </div>
      <div class="divider"></div>
      <div class="tableNavItem" :class="{ disabled: !totalAmountOfItemsSelected }">
        <BasicIcon name="EditPencil" /><span>Rediger</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !totalAmountOfItemsSelected }">
        <BasicIcon name="Copy" /><span>Kopier</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !totalAmountOfItemsSelected }">
        <BasicIcon name="ArrowUpRight" /><span>Flyt</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !totalAmountOfItemsSelected }">
        <BasicIcon name="Printer" /><span>Print</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !totalAmountOfItemsSelected }">
        <BasicIcon name="Trash" /><span>Slet</span>
      </div>
    </div>

    <!-- Højre side: filtrer, sorter, skift visning -->
    <div class="rightSection">
      <div class="tableNavIcon"><BasicIcon name="Filter" /></div>
      <div class="tableNavIcon" @click.stop="onSortToggle" :class="{ active: sortDirection !== 'none' }">
        <BasicIcon 
        :name="sortDirection === 'desc' ? 'SortDescending' : 'SortAscending'"
        /></div>
      <div
        class="tableNavIcon"
        :class="{ active: currentView === 'list' }"
        @click="toggleView('list')"
      >
        <BasicIcon name="ListUnordered" />
      </div>
      <div
        class="tableNavIcon"
        :class="{ active: currentView === 'detailed' }"
        @click="toggleView('detailed')"
      >
        <BasicIcon name="MoreGridSmall" />
      </div>
    </div>
  </div>

  <FolderSection
    ref="folderSection"
    :showCreateDialog="props.showCreateDialog"
    :sort-direction="sortDirection"
    @update:showCreateDialog="update"
    @selection-changed="handleSelectionChanged"
  />

  <div v-if="!totalAmountOfItemsOnScreen">
    Mappen er tom
  </div>
</template>

<style scoped lang="scss">
.tableNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $white;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  margin-top: 2rem;
  font-weight: 500;

  .customCheckbox {
    width: 16px;
    height: 16px;
    border: 2px solid $black;
    border-radius: 4px;
    appearance: none;
    cursor: pointer;
    position: relative;
    margin-bottom: 7px;

    &:checked {
      border-color: $darkGreen;
      background-color: $darkGreen;
      &::after {
        content: "";
        position: absolute;
        left: 3.2px;
        top: 0;
        width: 4px;
        height: 8px;
        border: solid $white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:hover {
      border-color: $darkGreen;
    }
  }

  .leftSection {
    display: flex;
    align-items: center;
    gap: 1rem;

    .tableNavItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      color: $black;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;

      &:hover { background-color: $lightGreen; }
      &:active { background-color: $lightGreen; }
      &.checked { background-color: $lightGreen; }
      &.disabled {
        opacity: 0.3;
        cursor: default;
        &:hover { background-color: $lightGreen; }
      }
    }
  }

  .rightSection {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .tableNavIcon {
      background-color: $lightGrey;
      padding: 0.4rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover { background-color: $lightGreen; }
      &.active {
        background-color: $mediumGrey;
        color: $white;
      }
    }
  }

  .divider {
    height: 1.5rem;
    width: 1px;
    background-color: $mediumGrey;
  }
}
</style>
