<template>
  <div>
    <!-- Folder Explorer Section -->
    <div class="folder-explorer">
      <h3>Viewing: <span>{{ currentFolderName }}</span></h3>
      <!-- Back button: shows only if we're not at the root level -->
      <button v-if="currentFolderId" @click="goBack">Back</button>
      <ul>
        <!-- List all folders that belong to the current folder -->
        <li v-for="folder in folders" :key="folder.id">
          <button @click="enterFolder(folder.id, folder.name)">
            {{ folder.name }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Folder Creation Form Section -->
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
  serverTimestamp
} from 'firebase/firestore';
// Use type-only imports for types
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '@/configs/firebase';

// -------------------------------------------------
// Folder Explorer State and Functions
// -------------------------------------------------

// currentFolderId tracks the folder being viewed (null for root)
const currentFolderId = ref<string | null>(null);
// currentFolderName holds the display name ("Root" at the top level)
const currentFolderName = ref('Root');

// folders holds the list of child folders for the current folder
const folders = ref<Array<{ id: string; name: string }>>([]);

// We'll store the unsubscribe function to cleanup the listener later
let unsubscribe: () => void = () => {};

// Function to query Firestore for folders with current parentId
const fetchFolders = () => {
  // Clean up the previous listener, if it exists
  if (unsubscribe) unsubscribe();

  // Build the query: select folders where "parentId" equals the currentFolderId value.
  const q = query(
    collection(db, 'folders'),
    where('parentId', '==', currentFolderId.value)
  );

  // Start a real-time listener
  unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const folderList: Array<{ id: string; name: string }> = [];
    snapshot.forEach((doc) => {
      folderList.push({ id: doc.id, name: doc.data().name });
    });
    folders.value = folderList;
  });
};

// Set up initial listener when the component mounts
onMounted(() => {
  fetchFolders();
});

// Watch for changes in currentFolderId to update the folder list
watch(currentFolderId, () => {
  fetchFolders();
});

// Clean up the listener when the component unmounts
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

// Navigate into a folder
const enterFolder = (folderId: string, folderNameVal: string) => {
  currentFolderId.value = folderId;
  currentFolderName.value = folderNameVal;
};

// Navigate back to the root folder
const goBack = () => {
  currentFolderId.value = null;
  currentFolderName.value = 'Root';
};

// -------------------------------------------------
// Folder Creation Form State and Functions
// -------------------------------------------------

// Folder name input from the form
const folderName = ref<string>('');

// onSubmit creates a new folder in the currently viewed folder
const onSubmit = async () => {
  // Validate that the folder name is not empty
  if (!folderName.value.trim()) return;

  // Build the folder data; the parent is automatically set to currentFolderId
  const folderData = {
    name: folderName.value.trim(),
    parentId: currentFolderId.value, // Use currentFolderId to nest folders
    createdAt: serverTimestamp()
  };

  try {
    // Create a new folder document in the 'folders' collection in Firestore
    const docRef = await addDoc(collection(db, 'folders'), folderData);
    console.log('Folder created with ID:', docRef.id);
  } catch (error) {
    console.error('Error creating folder:', error);
  }

  // Reset the folder name for the next entry
  folderName.value = '';
};
</script>

<style scoped>
/* Styling for the explorer and form */
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

button {
  background: none;
  border: none;
  color: #0366d6;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0;
}

button:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
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
