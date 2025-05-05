import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useFoldersStore = defineStore('wizardStore', () => {
  const currentFolderId = ref<string | null>(null);
  const currentFolderName = ref('Root');
  const folders = ref<Array<{ id: string; name: string }>>([]);
  return {
    currentFolderId,
    currentFolderName,
    folders,
  };
});

