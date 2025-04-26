<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { inject, ref, computed } from 'vue';

const injectedView = inject('currentView', ref('detailed'));
const currentView = computed(() => injectedView.value);

const folders = [
  { id: 1, name: "Mappe A" },
  { id: 2, name: "Mappe B" },
  { id: 3, name: "Mappe C" },
  { id: 4, name: "Mappe D" },
  { id: 5, name: "Mappe E" },
  { id: 6, name: "Mappe F" },
  { id: 7, name: "Mappe G" },
  { id: 8, name: "Mappe H" },
  { id: 9, name: "Mappe I" },
  { id: 10, name: "Mappe J" }
];
</script>

<template>
  <div :class="['folderContainer', currentView]">
    <div 
      v-for="(folder, index) in folders" 
      :key="folder.id" 
      :class="['folder', currentView]"
    >
      <div class="folderContent">
        <!-- List-view elementer -->
        <template v-if="currentView === 'list'">
          <BasicIcon name="ChevronRight" class="arrow" />
          <input type="checkbox" class="folderCheckbox">
        </template>
        
        <!-- Fælles elementer -->
        <BasicIcon name="Folder" class="folderIcon" />
        <p>{{ folder.name }}</p>
        
        <!-- List-view menu -->
        <button v-if="currentView === 'list'" class="menuDots">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folderContainer {
  &.detailed {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
    max-width: 100%;
    margin-top: 1.5rem;

    .folderContent {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 16px;
      background: $white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
      display: flex;
      padding: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;

      .folderIcon {
        width: 48px;
        height: 48px;
        color: $darkGrey;
      }

      p {
        @include bodyText;
        text-align: center;
        margin: 0;
        color: $black;
      }
    }
  }

  &.list {
    display: flex;
    flex-direction: column;
    background: $white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 1.5rem;

    .folder:nth-child(odd) .folderContent {
      background: $lightestGrey;
    }

    .folder:nth-child(even) .folderContent {
      background: $lightGrey;
    }

    .folderContent {
      display: flex;
      width: 100%;
      height: 60px;
      padding: 0 20px;
      align-items: center;
      gap: 16px;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid $mediumGrey;

      &:hover {
        background: $lightGreen !important;
      }

      &:last-child {
        border-bottom: none;
      }

      .arrow {
        width: 16px;
        height: 16px;
        color: $mediumGrey;
      }

      .folderCheckbox {
        width: 16px;
        height: 16px;
        accent-color: $darkGreen;
      }

      .folderIcon {
        width: 24px;
        height: 24px;
        color: $darkGrey;
      }

      p {
        @include bodyText;
        flex-grow: 1;
        text-align: left;
        margin: 0;
        color: $black;
      }

      .menuDots {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 16px;
        width: 24px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;

        span {
          display: block;
          width: 4px;
          height: 4px;
          background-color: $mediumGrey;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>