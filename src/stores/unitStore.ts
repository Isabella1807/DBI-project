import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {createUnit} from '@/services/unitService.ts';
import {ref, type Ref, watch} from 'vue';

export const useUnitStore = defineStore('unitStore', () => {
  const folderStore = useFolderStore();
  const visibleUnits: Ref<UnitTypeWithId[]> = ref([]);

  const createNew = (unit: unitInputType) => {
    createUnit({
      ...unit,
      parentId: folderStore.currentFolderId,
    }).then(createdUnit => {
      // Success!
      visibleUnits.value.push(createdUnit);
    }).catch(error => {
      // Handle error
      console.log(error);
    });
  };

  watch(() => folderStore.currentFolderId, () => {
    // Viewed folder changed. "Forget" all visible units, and fetch units visible in the new folder.
    visibleUnits.value = [];

    //TODO: Fetch all units with folderid via service layer and place in visibleUnits array

  });

  return {
    createNew,
    visibleUnits,
  };
});
