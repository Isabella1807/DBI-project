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
import {useFolderStore} from '@/stores/folderStore.ts';

import BasicIcon from '@/components/atoms/BasicIcon.vue';
import FolderMenu from '@/components/molecules/FolderMenu.vue';
import CreateFolderDialog from '@/components/molecules/CreateFolderDialog.vue';

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {db} from '@/configs/firebase.ts';
import {getAuth} from 'firebase/auth';

import {useUnitStore} from '@/stores/unitStore.ts';
import {useWizardStore} from '@/stores/wizardStore.ts';
import {useAuthStore} from '@/stores/loginStore.ts';

const unitStore = useUnitStore();
const wizardStore = useWizardStore();
const authStore = useAuthStore();

interface Folder {
  id: string;
  name: string;
  selected: boolean;
  type: 'folder';
}

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
  (e: 'update:showCreateDialog', v: boolean): void;
  (e: 'selectionChanged', count: number): void;
}>();

const folderStore = useFolderStore();
const currentFolderId = computed(() => folderStore.currentFolderId);
const currentFolderName = computed(() => folderStore.currentFolderName);

const currentView = inject<Ref<'detailed' | 'list'>>('currentView', ref('detailed'))!;
const isAllSelected = inject<Ref<boolean>>('isAllSelected', ref(false))!;

const folders = ref<Folder[]>([]);
const selectionCount = computed(() => folders.value.filter(f => f.selected).length);
watch(selectionCount, cnt => emit('selectionChanged', cnt));
watch(isAllSelected, all => {
  folders.value.forEach(f => (f.selected = all));
}, {immediate: true});

// Firestore subscription
let unsubscribe = () => {
};

function fetchFolders() {
  unsubscribe();
  if (!authStore.userId) {
    folders.value = [];
    return;
  }

  const q = query(
    collection(db, 'folders'),
    where('parentId', '==', currentFolderId.value),
    where('userId', '==', authStore.userId),
  );

  unsubscribe = onSnapshot(q, snap => {
    folders.value = snap.docs.map(d => ({
      id: d.id,
      name: d.data().name as string,
      selected: false,
      type: 'folder',
    }));
  });
}

interface FolderUnitItem  {
  id: string;
  name: string;
  type: 'folder' | 'unit';
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
  unsubscribe();
});

// Navigation
function enterItem(item: FolderUnitItem) {
  if (item.type === 'folder') {
    folderStore.enterFolder(item.id, item.name);
  }
}

// Create-folder dialog
async function onDialogSubmit(name: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!name.trim() || !user) return;

  await addDoc(collection(db, 'folders'), {
    name: name.trim(),
    parentId: currentFolderId.value,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

  emit('update:showCreateDialog', false);
}

function onDialogCancel() {
  emit('update:showCreateDialog', false);
}

// Rename & recursive delete
async function renameFolder(id: string, oldName: string) {
  const newName = window.prompt('New folder name:', oldName);
  if (!newName || newName.trim() === oldName) return;
  await updateDoc(doc(db, 'folders', id), {name: newName.trim()});
}

async function deleteFolderAndChildren(id: string) {
  // 1) Recurse into sub-folders owned by this user
  const subFolderQ = query(
    collection(db, 'folders'),
    where('parentId', '==', id),
    where('userId', '==', authStore.userId),
  );
  const subFolderSnap = await getDocs(subFolderQ);
  for (const folderDoc of subFolderSnap.docs) {
    await deleteFolderAndChildren(folderDoc.id);
  }

  // 2) Delete any units in this folder
  const unitQ = query(
    collection(db, 'units'),
    where('folderId', '==', id),
    where('userId', '==', authStore.userId),
  );
  const unitSnap = await getDocs(unitQ);
  for (const unitDoc of unitSnap.docs) {
    await deleteDoc(doc(db, 'units', unitDoc.id));
  }

  // 3) Finally delete the folder itself
  await deleteDoc(doc(db, 'folders', id));
}

async function deleteFolder(id: string) {
  if (!confirm('Slet denne mappe og alle under mapper også?')) return;
  await deleteFolderAndChildren(id);
}

/**
 * Windows-style copy namer:
 *  • strips any existing “ - Copy” or “ - Copy (n)”
 *  • finds the highest copy-index among existingNames
 *  • returns either “BaseName - Copy” (if none yet) or “BaseName - Copy (k+1)”
 */
function generateCopyName(existingNames: string[], sourceName: string): string {
  // 1) Peel off any “ - Copy” or “ - Copy (n)” from the end to get the true base
  const stripRe = /^(.*) - Copy(?: \(\d+\))?$/;
  const match = sourceName.match(stripRe);
  const base = match ? match[1] : sourceName;

  // 2) Build a regex to match either “Base - Copy” or “Base - Copy (num)”
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const copyRe = new RegExp(`^${esc(base)} - Copy(?: \\((\\d+)\\))?$`);

  // 3) Scan existingNames for the highest index
  let max = 0;
  existingNames.forEach(name => {
    const m = name.match(copyRe);
    if (!m) return;
    // m[1] is the digit if it exists
    const idx = m[1] ? parseInt(m[1], 10) : 1;
    if (idx > max) max = idx;
  });

  // 4) If max is 0 → no copies yet, so do “Base - Copy”
  //    else → bump to “Base - Copy (max+1)”
  return max === 0
    ? `${base} - Copy`
    : `${base} - Copy (${max + 1})`;
}

async function copyFolderRecursive(
  originalFolderId: string,
  newParentId: string | null,
  newName: string
) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  // a) Copy the folder itself
  const newRef = await addDoc(collection(db, 'folders'), {
    name: newName,
    parentId: newParentId,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
  const newFolderId = newRef.id;

  // b) Copy all *units* in this folder — use `parentId`, not `folderId`
  const unitSnap = await getDocs(
    query(
      collection(db, 'units'),
      where('parentId', '==', originalFolderId),
      where('userId', '==', user.uid)
    )
  );
  for (const u of unitSnap.docs) {
    await addDoc(collection(db, 'units'), {
      ...u.data(),
      parentId: newFolderId,      // ← mirror your createUnit service
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  }

  // c) Recurse into sub-folders (this was already correct)
  const subSnap = await getDocs(
    query(
      collection(db, 'folders'),
      where('parentId', '==', originalFolderId),
      where('userId', '==', user.uid)
    )
  );
  for (const f of subSnap.docs) {
    await copyFolderRecursive(
      f.id,
      newFolderId,
      f.data().name as string
    );
  }
}



// ——— 3) Hook into the “copy” menu action ———
async function handleMenuAction(payload: { itemId: string; action: string }) {
  const folder = folders.value.find(f => f.id === payload.itemId);

  if (folder) {
    // Folder actions
    if (payload.action === 'edit') {
      await renameFolder(payload.itemId, folder.name);
    } else if (payload.action === 'delete') {
      await deleteFolder(payload.itemId);
    } else if (payload.action === 'copy') {
      // generate a unique “- Copy (n)” name for folders
      const existingFolderNames = folders.value.map(f => f.name);
      const newFolderName = generateCopyName(existingFolderNames, folder.name);
      // then copy recursively into the current folder
      await copyFolderRecursive(
        payload.itemId,
        currentFolderId.value,
        newFolderName
      );
    }

  } else {
    // Unit actions
    const u = unitStore.getUnitById(payload.itemId);
    if (!u) return;

    if (payload.action === 'edit') {
      wizardStore.open(u);

    } else if (payload.action === 'delete') {
      unitStore.deleteById(payload.itemId);

    } else if (payload.action === 'copy') {
      // generate a unique “- Copy (n)” name for units
      const existingUnitNames = unitStore.visibleUnits.map(unit => unit.name);
      const newUnitName = generateCopyName(existingUnitNames, u.name);
      // then copy into the current folder
      await unitStore.copyUnit(u, newUnitName, currentFolderId.value);
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
  await updateDoc(doc(db, 'folders', folderId), {parentId: newParentId});
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
