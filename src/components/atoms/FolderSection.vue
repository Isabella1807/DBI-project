<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { inject, ref, computed, watch } from 'vue';

const emit = defineEmits(['selectionChanged']);

// Modtager viewType fra TableNav
const injectedView = inject('currentView', ref('detailed'));
const currentView = computed(() => injectedView.value);

const selectedFoldersCount = computed(() => {
  return folders.value.filter(folder => folder.selected).length;
});

// Modtager om alt er markeret fra TableNav
const injectedSelectAll = inject('isAllSelected', ref(false));

// Dummy mappe-data
const folders = ref([
  { id: 1, name: "Mappe A", selected: false },
  { id: 2, name: "Mappe B", selected: false },
  { id: 3, name: "Mappe C", selected: false },
  { id: 4, name: "Mappe D", selected: false },
  { id: 5, name: "Mappe E", selected: false },
  { id: 6, name: "Mappe F", selected: false },
  { id: 7, name: "Mappe G", selected: false },
  { id: 8, name: "Mappe H", selected: false },
  { id: 9, name: "Mappe I", selected: false },
  { id: 10, name: "Mappe J", selected: false }
]);

// Når valg ændres
watch(selectedFoldersCount, (count) => {
  emit('selectionChanged', count);
});

// Når "Markér alt" ændres, så marker alle mapper
watch(injectedSelectAll, (newVal) => {
  folders.value.forEach(folder => {
    folder.selected = newVal;
  });
}, { immediate: true });
</script>

<template>
  <div :class="['folderContainer', currentView]">
    <div v-for="(folder, index) in folders" :key="folder.id" :class="['folder', currentView]">
      <div class="folderContent" :class="{ selected: folder.selected }" @click="folder.selected = !folder.selected">
        <BasicIcon v-if="currentView === 'list'" name="ChevronRight" class="arrow" />

        <!-- Checkbox vises altid, men styres af CSS i detailed view -->
        <input type="checkbox"
               class="folderCheckbox"
               v-model="folder.selected"
               @click.stop />

        <!-- Fælles indhold -->
        <BasicIcon name="Folder" class="folderIcon" />
        <p>{{ folder.name }}</p>

        <!-- Menu dots vises altid, men styres af CSS i detailed view -->
        <button class="menuDots" @click.stop>
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
      position: relative;

      &:hover {
        background-color: $lightGreen;
      }

      &.selected {
        background-color: $lightGreen;
      }

      .folderIcon {
        width: 90px;
        height: auto;
        color: $darkGrey;
      }

      p {
        @include bodyText;
        text-align: center;
        margin: 0;
        color: $black;
        font-weight: 500;
      }

      // Checkbox og menuDots placering i detailed
      .folderCheckbox {
        position: absolute;
        top: 18px;
        left: 25px;
        width: 16px;
        height: 16px;
        border: 2px solid $darkGrey;
        border-radius: 4px;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        transition: all 0.2s ease;
        opacity: 0;
        pointer-events: none;

        &:checked {
          border-color: $darkGreen;
          background-color: $darkGreen;
          opacity: 1;
          pointer-events: auto;

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

      .menuDots {
        position: absolute;
        top: 25px;
        right: 25px;
        display: flex;
        flex-direction: row;
        gap: 3px;
        width: 24px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;

        span {
          display: block;
          width: 4px;
          height: 4px;
          background-color: $black;
          border-radius: 50%;
        }
      }

      // Vis checkbox og menuDots ved hover eller når selected
      &:hover,
      &.selected {
        .folderCheckbox,
        .menuDots {
          opacity: 1;
          pointer-events: auto;
        }
      }

      // Sørg for at checkbox altid er synlig når den er checked
      .folderCheckbox:checked {
        opacity: 1;
        pointer-events: auto;
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

      &:hover,
      &.selected {
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
    }
  }
}
</style>
