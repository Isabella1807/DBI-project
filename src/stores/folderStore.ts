import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Ancestor {
  id: string | null;
  name: string;
}

export const useFolderStore = defineStore('folder', () => {
  // A fixed label for your “top‐level” view:
  const rootLabel = 'All files';

  // These track where you are:
  const currentFolderId = ref<string | null>(null);
  const currentFolderName = ref<string>(rootLabel);

  // Only store *real* ancestors here:
  const ancestors = ref<Ancestor[]>([]);

  function enterFolder(id: string, name: string) {
    // push only if you’re inside a non‐root folder
    if (currentFolderId.value !== null) {
      ancestors.value.push({
        id: currentFolderId.value,
        name: currentFolderName.value,
      });
    }
    currentFolderId.value = id;
    currentFolderName.value = name;
  }

  function goToAncestor(index: number) {
    const target = ancestors.value[index];
    currentFolderId.value = target.id;
    currentFolderName.value = target.name;
    // remove all deeper ancestors
    ancestors.value.splice(index);
  }

  function resetToRoot() {
    currentFolderId.value = null;
    // reset back to the fixed rootLabel
    currentFolderName.value = rootLabel;
    ancestors.value = [];
  }

  return {
    rootLabel,
    currentFolderId,
    currentFolderName,
    ancestors,
    enterFolder,
    goToAncestor,
    resetToRoot,
  };
});
