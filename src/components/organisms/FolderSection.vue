<script setup lang="ts">
import {
  inject,
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  toRef,
  defineExpose,
  type Ref, type ComputedRef,
} from 'vue';
import {useBreadcrumbStore} from '@/stores/breadcrumbStore.ts';

import BasicIcon from '@/components/atoms/BasicIcon.vue';
import FolderMenu from '@/components/molecules/FolderMenu.vue';
import CreateFolderDialog from '@/components/molecules/CreateFolderDialog.vue';

import {useUnitStore} from '@/stores/unitStore.ts';
import {useWizardStore} from '@/stores/wizardStore.ts';
import {useAuthStore} from '@/stores/loginStore.ts';
import {
  createFolder,
  deleteFolderAndChildren, subscribeToFolder, unsubscribeFromFolder,
  updateFolderName,
  updateFolderParentId,
} from '@/services/folderService.ts';
import type {Folder, FolderUnitItem} from '@/types/folderTypes.ts';

const unitStore = useUnitStore();
const wizardStore = useWizardStore();
const authStore = useAuthStore();

const itemSelectedList: Ref<string[]> = ref([]);

const clearSelectedList = () => {
  itemSelectedList.value = [];
};

const toggleItemSelection = (id: string) => {
  const idx = itemSelectedList.value.indexOf(id);
  if (idx !== -1) {
    itemSelectedList.value.splice(idx, 1);
  } else {
    itemSelectedList.value.push(id);
  }
};

const toggleAllItemsSelection = () => {
  if (everythingIsSelected.value) {
    clearSelectedList();
  } else {
    folders.value.forEach(f => {
      if (!itemSelectedList.value.includes(f.id))
        itemSelectedList.value.push(f.id);
    });
    unitsOnScreen.value.forEach(u => {
      if (!itemSelectedList.value.includes(u.id))
        itemSelectedList.value.push(u.id);
    });
  }
};

const props = defineProps<{ showCreateDialog: boolean }>();
const showCreateDialog = toRef(props, 'showCreateDialog');
const emit = defineEmits<{
  (event: 'update:showCreateDialog', isVisible: boolean): void;
  (event: 'selectionChanged', count: number): void;
}>();

const breadcrumbStore = useBreadcrumbStore();
const currentFolderId = computed(() => breadcrumbStore.currentFolderId);
const currentFolderName = computed(() => breadcrumbStore.currentFolderName);

const currentView = inject<Ref<'detailed' | 'list'>>('currentView', ref('detailed'))!;
const isAllSelected = inject<Ref<boolean>>('isAllSelected', ref(false))!;

const folders = ref<Folder[]>([]);
const selectionCount = computed(() => folders.value.filter(f => f.selected).length);
watch(selectionCount, count => emit('selectionChanged', count));
watch(isAllSelected, all => {
  folders.value.forEach(f => (f.selected = all));
}, {immediate: true});


// Firestore subscription
function fetchFolders() {
  if (!authStore.userId) {
    folders.value = [];
    return;
  }

  subscribeToFolder(currentFolderId.value, folders);
}

const unitsOnScreen: ComputedRef<FolderUnitItem[]> = computed(() =>
  unitStore.visibleUnits.map(unit => ({
    id: unit.id,
    name: unit.name,
    type: 'unit',
  })),
);

const content: ComputedRef<FolderUnitItem[]> = computed(() => [
  ...folders.value.map(folder => ({id: folder.id, name: folder.name, type: 'folder' as const})),
  ...unitsOnScreen.value,
]);

const totalAmountOfItemsOnScreen = computed(() => content.value.length);
const totalAmountOfItemsSelected = computed(() => itemSelectedList.value.length);
const everythingIsSelected = computed(() =>
  totalAmountOfItemsOnScreen.value === totalAmountOfItemsSelected.value,
);

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchFolders();
  }
  unitStore.refreshVisibleUnits(currentFolderId.value);
});

watch(currentFolderId, () => {
  fetchFolders();
  clearSelectedList();
});

onUnmounted(() => {
  unsubscribeFromFolder();
});

// Navigation
function enterItem(item: FolderUnitItem) {
  if (item.type === 'folder') {
    breadcrumbStore.enterFolder(item.id, item.name);
  }
}

// Create-folder dialog
async function onDialogSubmit(name: string) {
  if (!name.trim()) return;

  await createFolder(name, currentFolderId.value, authStore.userId).then(() => {
    emit('update:showCreateDialog', false);
  });
}

function onDialogCancel() {
  emit('update:showCreateDialog', false);
}

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
function handleMenuAction(payload: { itemId: string; action: string }) {
  const folder = folders.value.find(f => f.id === payload.itemId);
  if (folder) {
    if (payload.action === 'edit') {
      renameFolder(payload.itemId, folder.name);
    } else if (payload.action === 'delete') {
      deleteFolder(payload.itemId);
    }
  } else {
    // It's a unit
    if (payload.action === 'edit') {
      const u = unitStore.getUnitById(payload.itemId);
      if (u) wizardStore.open(u);
    } else if (payload.action === 'delete') {
      unitStore.deleteById(payload.itemId);
    }
  }
}

defineExpose({
  toggleAllItemsSelection,
  totalAmountOfItemsOnScreen,
  totalAmountOfItemsSelected,
});

//Update folder parentID in DB..
const changeFolderParentId = async (folderId: string, newParentId: string) => {
  await updateFolderParentId(folderId, newParentId);
};

//DragnDrop handling
const currentlyDraggedItem: Ref<FolderUnitItem | null> = ref(null);

const setCurrentlyDraggedItem = (draggedItem: FolderUnitItem) => {
  currentlyDraggedItem.value = draggedItem;
};

const handleDrop = (itemDroppedOn: FolderUnitItem) => {
  //Make sure something is dragged
  if (!currentlyDraggedItem.value) return;

  //Dont drop items into units
  if (itemDroppedOn.type === 'unit') return;

  //Dont drop yourself on yourself
  if (itemDroppedOn.id === currentlyDraggedItem.value.id) return;

  //Make sure none of selected items are currentlyDraggedItem
  if (itemSelectedList.value.includes(itemDroppedOn.id)) return;

  const uniquelyDroppedItemIds = new Set([...itemSelectedList.value, currentlyDraggedItem.value.id]);

  uniquelyDroppedItemIds.forEach(itemId => {
    const itemIsAUnit = unitStore.idBelongsToUnit(itemId);

    if (itemIsAUnit) {
      unitStore.changeParentId(itemId, itemDroppedOn.id);
    } else {
      changeFolderParentId(itemId, itemDroppedOn.id);
    }
  });
};
</script>


<template>
  <div>
    <div :class="['folderContainer', currentView]">
      <div
        draggable="true"
        @dragstart="setCurrentlyDraggedItem(item)"
        @dragover.prevent=""
        @drop="handleDrop(item)"
        v-for="item in content"
        :key="item.id"
        :class="['folder', currentView]"
      >
        <div
          class="folderContent"
          :class="{ selected: itemSelectedList.includes(item.id), 'unit-style': item.type === 'unit' }"
          @click="toggleItemSelection(item.id)"
          @dblclick.stop="enterItem(item)"
        >
          <BasicIcon
            v-if="currentView === 'list'"
            name="ChevronRight"
            class="arrow"
            @click.stop="enterItem(item)"
          />

          <input
            type="checkbox"
            class="folderCheckbox"
            :checked="itemSelectedList.includes(item.id)"
            @click.stop="toggleItemSelection(item.id)"
          />

          <BasicIcon
            :name="item.type === 'unit' ? 'Unit' : 'Folder'"
            class="folderIcon"
          />
          <p>{{ item.name }}</p>

          <FolderMenu
            :folder-id="item.id"
            @option-selected="handleMenuAction"
            @click.stop
          />
        </div>
      </div>
    </div>

    <CreateFolderDialog
      :visible="showCreateDialog"
      :currentFolderName="currentFolderName"
      @submit="onDialogSubmit"
      @cancel="onDialogCancel"
    />
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
