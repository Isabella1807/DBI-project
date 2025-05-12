<!--
<template>
  <div>
    &lt;!&ndash; Folder Explorer Section &ndash;&gt;
    <div class="folder-explorer">
      <h3>Viewing: <span>{{ currentFolderName }}</span></h3>
      <button v-if="currentFolderId" @click="goBack">Back</button>
      <ul>
        <li v-for="folder in folders" :key="folder.id" class="folder-row">
          &lt;!&ndash; Enter folder &ndash;&gt;
          <button class="enter-btn" @click="enterFolder(folder.id, folder.name)">
            {{ folder.name }}
          </button>
          &lt;!&ndash; Rename folder &ndash;&gt;
          <button class="action-btn" @click="renameFolder(folder.id, folder.name)">
            Edit
          </button>
          &lt;!&ndash; Delete folder (with recursive removal) &ndash;&gt;
          <button class="action-btn delete" @click="deleteFolder(folder.id)">
            Delete
          </button>
        </li>
      </ul>
    </div>

    &lt;!&ndash; Folder Creation Form Section &ndash;&gt;
    <div class="folder-creation">
      <h3>Create New Folder in {{ currentFolderName }}</h3>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="folderName">Folder Name:</label>
          <input id="folderName" v-model="folderName" placeholder="Folder Name" required />
        </div>
        <button type="submit">Create Folder</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
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
// type-only imports
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '@/configs/firebase';

// -&#45;&#45; Explorer State -&#45;&#45;
const currentFolderId = ref<string | null>(null);
const currentFolderName = ref('Root');
const folders = ref<Array<{ id: string; name: string }>>([]);
let unsubscribe: () => void = () => {};

// Fetch & listen to folders under the current parent
const fetchFolders = () => {
  if (unsubscribe) unsubscribe();
  const q = query(
    collection(db, 'folders'),
    where('parentId', '==', currentFolderId.value),
  );
  unsubscribe = onSnapshot(q, (snap: QuerySnapshot<DocumentData>) => {
    folders.value = snap.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
  });
};

onMounted(fetchFolders);
watch(currentFolderId, fetchFolders);
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const enterFolder = (id: string, name: string) => {
  currentFolderId.value = id;
  currentFolderName.value = name;
};
const goBack = () => {
  currentFolderId.value = null;
  currentFolderName.value = 'Root';
};

// -&#45;&#45; Creation State -&#45;&#45;
const folderName = ref<string>('');
const onSubmit = async () => {
  if (!folderName.value.trim()) return;
  const folderData = {
    name: folderName.value.trim(),
    parentId: currentFolderId.value,
    createdAt: serverTimestamp(),
  };
  try {
    await addDoc(collection(db, 'folders'), folderData);
  } catch (e) {
    console.error(e);
  }
  folderName.value = '';
};

// -&#45;&#45; Rename -&#45;&#45;
const renameFolder = async (id: string, oldName: string) => {
  const newName = window.prompt('New folder name:', oldName);
  if (newName && newName.trim() && newName.trim() !== oldName) {
    const docRef = doc(db, 'folders', id);
    try {
      await updateDoc(docRef, { name: newName.trim() });
    } catch (e) {
      console.error(e);
    }
  }
};

// -&#45;&#45; Recursive Delete -&#45;&#45;
const deleteFolder = async (id: string) => {
  if (!confirm('Delete this folder and all its subfolders?')) return;
  try {
    await deleteFolderAndChildren(id);
  } catch (e) {
    console.error(e);
  }
};

async function deleteFolderAndChildren(folderId: string) {
  // delete subfolders first
  const subQ = query(
    collection(db, 'folders'),
    where('parentId', '==', folderId),
  );
  const snap = await getDocs(subQ);
  for (const child of snap.docs) {
    await deleteFolderAndChildren(child.id);
  }
  // then delete this folder
  await deleteDoc(doc(db, 'folders', folderId));
}
</script>

<style scoped>
.folder-explorer,
.folder-creation {
  max-width: 600px;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

.folder-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.enter-btn {
  flex: 1;
  background: none;
  border: none;
  color: #0366d6;
  text-align: left;
  cursor: pointer;
}

.enter-btn:hover {
  text-decoration: underline;
}

.action-btn {
  margin-left: 0.5rem;
  background: none;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.action-btn.delete {
  border-color: #d9534f;
  color: #d9534f;
}

.action-btn.delete:hover {
  background: #f2dede;
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
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
</style>
-->
