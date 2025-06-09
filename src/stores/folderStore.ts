import {defineStore} from 'pinia';
import {type Ref, ref, watch} from 'vue';
import type {Folder} from '@/types/folderTypes.ts';
import {useBreadcrumbStore} from '@/stores/breadcrumbStore.ts';
import {createFolder, subscribeToFolder} from '@/services/folderService.ts';

export const useFolderStore = defineStore('folderStore', () => {
  const breadcrumbStore = useBreadcrumbStore();
  const visibleFolders: Ref<Folder[]> = ref([]);

  const create = async (newFolderName: string) => {
    if (!newFolderName.trim()) {
      throw new Error('Folder har ikke et navn');
    }

    await createFolder(newFolderName, breadcrumbStore.currentFolderId);
  };

  const fetch = () => {
    subscribeToFolder(breadcrumbStore.currentFolderId, visibleFolders);
  };

  watch(() => breadcrumbStore.currentFolderId, () => {
    fetch();
  }, {immediate: true});

  return {
    visibleFolders,
    create,
    fetch,
  };
});
