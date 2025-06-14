<script setup lang="ts">
import {
  inject,
  ref,
  computed,
  watch,
  toRef,
  defineExpose,
  type Ref, type ComputedRef,
} from 'vue';
import CreateFolderDialog from '@/components/molecules/CreateFolderDialog.vue';
import type {FolderUnitItem} from '@/types/folderTypes.ts';
import FolderOrUnitCard from '@/components/molecules/FolderOrUnitCard.vue';
import {useBreadcrumbStore} from '@/stores/breadcrumbStore.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {useUnitStore} from '@/stores/unitStore.ts';

const unitStore = useUnitStore();
const breadcrumbStore = useBreadcrumbStore();
const folderStore = useFolderStore();

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
    folderStore.visibleFolders.forEach(f => {
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


const currentFolderId = computed(() => breadcrumbStore.currentFolderId);
const currentFolderName = computed(() => breadcrumbStore.currentFolderName);

const currentView = inject<Ref<'detailed' | 'list'>>('currentView', ref('detailed'))!;
const isAllSelected = inject<Ref<boolean>>('isAllSelected', ref(false))!;

const selectionCount = computed(() => folderStore.visibleFolders.filter(f => f.selected).length);
watch(selectionCount, count => emit('selectionChanged', count));
watch(isAllSelected, all => {
  folderStore.visibleFolders.forEach(f => (f.selected = all));
}, {immediate: true});

const unitsOnScreen: ComputedRef<FolderUnitItem[]> = computed(() =>
  unitStore.visibleUnits.map(unit => ({
    id: unit.id,
    name: unit.name,
    type: 'unit',
  })),
);

const content: ComputedRef<FolderUnitItem[]> = computed(() => [
  ...folderStore.visibleFolders.map(folder => ({
    id: folder.id,
    name: folder.name,
    type: 'folder' as const,
  })),
  ...unitsOnScreen.value,
]);

const totalAmountOfItemsOnScreen = computed(() => content.value.length);
const totalAmountOfItemsSelected = computed(() => itemSelectedList.value.length);
const everythingIsSelected = computed(() =>
  totalAmountOfItemsOnScreen.value === totalAmountOfItemsSelected.value,
);

watch(currentFolderId, () => {
  clearSelectedList();
});

// Create folder
async function onDialogSubmit(name: string) {
  await folderStore.create(name).then(() => {
    emit('update:showCreateDialog', false);
  });
}

function onDialogCancel() {
  emit('update:showCreateDialog', false);
}

defineExpose({
  toggleAllItemsSelection,
  totalAmountOfItemsOnScreen,
  totalAmountOfItemsSelected,
});

//DragnDrop handling
const currentlyDraggedItem: Ref<FolderUnitItem | null> = ref(null);

const setCurrentlyDraggedItem = (draggedItem: FolderUnitItem) => {
  currentlyDraggedItem.value = draggedItem;
};

const handleDrop = (itemDroppedOn: { isUnit: boolean, id: string }) => {
  //Make sure something is dragged
  if (!currentlyDraggedItem.value) return;

  //Dont drop items into units
  if (itemDroppedOn.isUnit) return;

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
      folderStore.move(itemId, itemDroppedOn.id);
    }
  });
};
</script>


<template>
  <div>
    <div :class="['folderContainer', currentView]">
      <FolderOrUnitCard
        v-for="item in content"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :isUnit="item.type === 'unit'"
        :isSelected="itemSelectedList.includes(item.id)"
        :currentView="currentView"
        @onSelect="toggleItemSelection(item.id)"
        draggable="true"
        @dragstart="setCurrentlyDraggedItem(item)"
        @dragover.prevent=""
        @drop="handleDrop({isUnit: item.type === 'unit', id: item.id})"
      />
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
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
