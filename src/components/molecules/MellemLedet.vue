<script setup lang="ts">
import BasicIcon from '../atoms/BasicIcon.vue';
import FolderSection from '@/components/atoms/FolderSection.vue';
import { ref, provide, onMounted } from 'vue';

const isAllSelected = ref(false);
provide('isAllSelected', isAllSelected);

const savedView = localStorage.getItem('currentView');
const currentView = ref(savedView || 'detailed');

const anySelected = ref(false);

function handleSelectionChanged(selectedCount: number) {
  anySelected.value = selectedCount > 0;
  isAllSelected.value = selectedCount === 10; // Antal mapper
}

function toggleView(viewType: string) {
  currentView.value = viewType;
  localStorage.setItem('currentView', viewType);
}

provide('currentView', currentView);
provide('toggleView', toggleView);

onMounted(() => {
  if (!['list', 'detailed'].includes(currentView.value)) {
    currentView.value = 'detailed';
    localStorage.setItem('currentView', 'detailed');
  }
});
</script>

<template>
  <div class="tableNav">
    <!-- Venstre side -->
    <div class="leftSection">
      <div class="tableNavItem" :class="{ checked: isAllSelected }">
        <input type="checkbox" id="selectAll" class="customCheckbox" v-model="isAllSelected"/>
        <label for="selectAll">Markér alt</label>
      </div>

      <div class="divider"></div>

      <div class="tableNavItem" :class="{ disabled: !anySelected }">
        <BasicIcon name="EditPencil"/>
        <span>Rediger</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !anySelected }">
        <BasicIcon name="Copy"/>
        <span>Kopier</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !anySelected }">
        <BasicIcon name="ArrowUpRight"/>
        <span>Flyt</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !anySelected }">
        <BasicIcon name="Printer"/>
        <span>Print</span>
      </div>
      <div class="tableNavItem" :class="{ disabled: !anySelected }">
        <BasicIcon name="Trash"/>
        <span>Slet</span>
      </div>
    </div>

    <!-- Højre side -->
    <div class="rightSection">
      <div class="tableNavIcon">
        <BasicIcon name="Filter"/>
      </div>
      <div class="tableNavIcon">
        <BasicIcon name="SortAscending"/>
      </div>
      <div class="tableNavIcon" :class="{ active: currentView === 'list' }"
           @click="toggleView('list')">
        <BasicIcon name="ListUnordered"/>
      </div>
      <div class="tableNavIcon" :class="{ active: currentView === 'detailed' }"
           @click="toggleView('detailed')">
        <BasicIcon name="MoreGridSmall"/>
      </div>
    </div>
  </div>

  <FolderSection @selection-changed="handleSelectionChanged" />
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
    -webkit-appearance: none;
    cursor: pointer;
    transition: all 0.2s ease;
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

      &:hover {
        background-color: $lightGreen;
      }

      &:active {
        background-color: $lightGreen;
      }

      &.checked {
        // ← Tilføjet!
        background-color: $lightGreen;
      }

      &.disabled {
        opacity: 0.3;
        cursor: default;

        // stadig hover effekt hvis ønsket
        &:hover {
          background-color: $lightGreen;
        }
      }
    }
  }

  .rightSection {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tableNavIcon {
    background-color: $lightGrey;
    padding: 0.4rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $lightGreen;
    }
  }

  .tableNavIcon.active {
    background-color: $mediumGrey;
    color: $white;
  }

  .divider {
    height: 1.5rem;
    width: 1px;
    background-color: $mediumGrey;
  }
}
</style>
