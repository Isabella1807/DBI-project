<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import {useBreadcrumbStore} from '@/stores/breadcrumbStore.ts';
import {useUnitStore} from '@/stores/unitStore.ts';
import {useWizardStore} from '@/stores/wizardStore.ts';
import {deleteFolderAndChildren, updateFolderName} from '@/services/folderService.ts';
import FolderMenu from '@/components/molecules/FolderMenu.vue';
const breadcrumbStore = useBreadcrumbStore();
const unitStore = useUnitStore();
const wizardStore = useWizardStore();

interface Props {
  name: string;
  isUnit?: boolean;
  id: string;
  isSelected: boolean;
  currentView: 'detailed' | 'list';
}

const props = defineProps<Props>();
const emit = defineEmits(['onSelect']);

const handleSelect = () => {
  emit('onSelect');
};
// Rename & recursive delete
async function renameFolder(id: string, oldName: string) {
  const newName = window.prompt('New folder name:', oldName);
  if (!newName || newName.trim() === oldName) return;
  await updateFolderName(newName, id);
}

async function deleteFolder(id: string) {
  if (!confirm('Slet denne mappe og alle under mapper også?')) return;
  await deleteFolderAndChildren(id);
}

// Menu actions
function handleMenuAction(action: string) {
  if (props.isUnit) {
    if (action === 'edit') {
      const unit = unitStore.getUnitById(props.id);
      if (unit) wizardStore.open(unit);
    } else if (action === 'delete') {
      unitStore.deleteById(props.id);
    }
  } else {
    //folders
    if (action === 'edit') {
      renameFolder(props.id, props.name);
    } else if (action === 'delete') {
      deleteFolder(props.id);
    }
  }
}

// Navigation
function enterItem() {
  if (!props.isUnit) {
    breadcrumbStore.enterFolder(props.id, props.name);
  }
}

</script>

<template>
  <div
    :class="['folder', props.currentView]"
  >
    <div
      class="folderContent"
      :class="{ selected: props.isSelected, 'unit-style': props.isUnit}"
      @click="handleSelect"
      @dblclick.stop="enterItem()"
    >
      <BasicIcon
        v-if="props.currentView === 'list'"
        name="ChevronRight"
        class="arrow"
        @click.stop="enterItem()"
      />

      <input
        type="checkbox"
        class="folderCheckbox"
        :checked="props.isSelected"
        @click.stop="handleSelect"
      />

      <BasicIcon
        :name="props.isUnit ? 'Unit' : 'Folder'"
        class="folderIcon"
      />
      <p>{{ props.name }}</p>

      <FolderMenu
        @option-selected="handleMenuAction"
        @click.stop
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navigation-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem auto 0;
  max-width: 600px;

  h3 {
    margin: 0;
    font-weight: 500;
  }

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #888;
    border-radius: 4px;
    background: none;
    cursor: pointer;
  }
}

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
        background-color: $mediumGreen;
      }

      .folderIcon {
        width: 80px;
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

      .folderCheckbox {
        position: absolute;
        top: 18px;
        left: 25px;
        width: 16px;
        height: 16px;
        border: 2px solid $darkGrey;
        border-radius: 4px;
        appearance: none;
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

      :deep(.menuDotsContainer) {
        position: absolute;
        top: 18px;
        right: 25px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }

      &:hover,
      &.selected {
        .folder
        Checkbox,
        :deep(.menuDotsContainer) {
          opacity: 1;
          pointer-events: auto;
        }
      }

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

      &:hover {
        background-color: $lightGreen !important;
      }

      &.selected {
        background-color: $mediumGreen !important;
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
        cursor: pointer;
        position: relative;

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

      :deep(.menuDotsContainer) {
        display: flex;
        align-items: center;
      }
    }
  }

  /* Creation form styling */
  .folder-creation {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    h3 {
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;

      > div {
        margin-bottom: 0.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.25rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        align-self: flex-start;
        padding: 0.5rem 1rem;
        border: none;
        background: $mediumGreen;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
