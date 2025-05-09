<script setup lang="ts">
import {
  inject,
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  toRef,
  type Ref
} from 'vue'
import { useFolderStore } from '@/stores/folderStore'

import BasicIcon from '@/components/atoms/BasicIcon.vue'
import FolderMenu from '@/components/atoms/FolderMenu.vue'
import CreateFolderDialog from '@/components/molecules/CreateFolderDialog.vue'

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
  doc
} from 'firebase/firestore'
import type { DocumentData, QuerySnapshot } from 'firebase/firestore'
import { db } from '@/configs/firebase'

interface Folder {
  id: string
  name: string
  selected: boolean
  isUnit: boolean
}

// Props & emits
const props = defineProps<{ showCreateDialog: boolean }>()
const showCreateDialog = toRef(props, 'showCreateDialog')
const emit = defineEmits<{
  (e: 'update:showCreateDialog', v: boolean): void
  (e: 'selectionChanged', count: number): void
}>()

// Pinia store for navigation state
const folderStore = useFolderStore()
const currentFolderId = computed(() => folderStore.currentFolderId)
const currentFolderName = computed(() => folderStore.currentFolderName)

// Injected UI state
const currentView = inject<Ref<'detailed' | 'list'>>('currentView', ref('detailed'))!
const isAllSelected = inject<Ref<boolean>>('isAllSelected', ref(false))!

// Folder data & selection
const folders = ref<Folder[]>([])
const selectionCount = computed(() => folders.value.filter(f => f.selected).length)
watch(selectionCount, cnt => emit('selectionChanged', cnt))
watch(isAllSelected, all => {
  folders.value.forEach(f => (f.selected = all))
}, { immediate: true })

// Firestore subscription
let unsubscribe = () => {}
function fetchFolders() {
  unsubscribe()
  const q = query(
    collection(db, 'folders'),
    where('parentId', '==', currentFolderId.value)
  )
  unsubscribe = onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
    folders.value = snap.docs.map(d => ({
      id: d.id,
      name: d.data().name as string,
      selected: false,
      isUnit: false
    }))
  })
}

onMounted(fetchFolders)
watch(currentFolderId, fetchFolders)
onUnmounted(() => unsubscribe())

// Navigation handlers
function enterFolder(id: string, name: string) {
  folderStore.enterFolder(id, name)
}
function goBack() {
  if (folderStore.ancestors.length) {
    folderStore.goToAncestor(folderStore.ancestors.length - 1)
  } else {
    folderStore.resetToRoot()
  }
}

// Create-folder dialog handlers
async function onDialogSubmit(name: string) {
  if (!name.trim()) return
  await addDoc(collection(db, 'folders'), {
    name: name.trim(),
    parentId: currentFolderId.value,
    createdAt: serverTimestamp()
  })
  emit('update:showCreateDialog', false)
}
function onDialogCancel() {
  emit('update:showCreateDialog', false)
}

// Rename & recursive delete
async function renameFolder(id: string, oldName: string) {
  const newName = window.prompt('New folder name:', oldName)
  if (!newName || newName.trim() === oldName) return
  await updateDoc(doc(db, 'folders', id), { name: newName.trim() })
}

async function deleteFolderAndChildren(id: string) {
  const subQ = query(collection(db, 'folders'), where('parentId', '==', id))
  const subSnap = await getDocs(subQ)
  for (const c of subSnap.docs) {
    await deleteFolderAndChildren(c.id)
  }
  await deleteDoc(doc(db, 'folders', id))
}

async function deleteFolder(id: string) {
  if (!confirm('Delete this folder and all its subfolders?')) return
  await deleteFolderAndChildren(id)
}

// Handle menu actions
function handleMenuAction(payload: { folderId: string; action: string }) {
  const f = folders.value.find(x => x.id === payload.folderId)
  if (payload.action === 'edit' && f) {
    renameFolder(payload.folderId, f.name)
  } else if (payload.action === 'delete') {
    deleteFolder(payload.folderId)
  }
}
</script>

<template>
  <div>
    <!-- Navigation Header -->
    <div class="navigation-header">
      <h3>Viewing: {{ currentFolderName }}</h3>
      <button v-if="currentFolderId" @click="goBack">Back</button>
    </div>

    <!-- Folder Grid / List -->
    <div :class="['folderContainer', currentView]">
      <div
        v-for="folder in folders"
        :key="folder.id"
        :class="['folder', currentView]"
      >
        <div
          class="folderContent"
          :class="{ selected: folder.selected, 'unit-style': folder.isUnit }"
          @click="folder.selected = !folder.selected"
          @dblclick.stop="enterFolder(folder.id, folder.name)"
        >
          <BasicIcon
            v-if="currentView === 'list'"
            name="ChevronRight"
            class="arrow"
            @click.stop="enterFolder(folder.id, folder.name)"
          />

          <input
            type="checkbox"
            class="folderCheckbox"
            v-model="folder.selected"
            @click.stop
          />

          <BasicIcon
            :name="folder.isUnit ? 'Unit' : 'Folder'"
            class="folderIcon"
          />
          <p>{{ folder.name }}</p>

          <FolderMenu
            :folder-id="folder.id as any"
            @option-selected="handleMenuAction"
            @click.stop
          />
        </div>
      </div>
    </div>

    <!-- Create-folder dialog -->
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
