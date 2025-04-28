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
    <div v-for="(folder, index) in folders" :key="folder.id" :class="['folder', currentView]">
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
    grid-template-columns: repeat(auto-fill, minmax(180px, calc(20% - 26px)));
    gap: 32px;
    max-width: 100%;
    margin-top: 1.5rem;
    padding: 0;

    .folderContent {
      width: 100%;
      height: 200px;
      border-radius: 16px;
      background: $white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
      display: flex;
      padding: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: $lightGreen;
      }

      .folderIcon {
        width: 80px;
        height: 80px;
        color: $darkGrey;
      }

      p {
        @include bodyText;
        text-align: center;
        margin: 0;
        color: $black;
        font-weight: 500;
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
      height: 40px;
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
        color: $black;
      }

      .folderCheckbox {
        width: 16px;
        height: 16px;
        border: 2px solid $black;
        border-radius: 4px;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;

        &:checked {
          border-color: $darkGreen;
          background-color: $darkGreen;

          &::after {
            content: "";
            position: absolute;
            left: 3.2px;
            top: 0px;
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

      .folderIcon {
        width: 24px;
        height: 24px;
        color: $darkGrey;
      }

      p {
        @include bodyText;
        font-weight: 500;
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
          background-color: $black;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>