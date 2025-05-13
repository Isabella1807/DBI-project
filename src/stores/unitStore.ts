import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {createUnit, getAllUnitsByFolderId} from '@/services/unitService.ts';
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

  const refreshVisibleUnits = async (newFolderId: string | null) => {
    visibleUnits.value = [];
    visibleUnits.value = await getAllUnitsByFolderId(newFolderId);
  };

  watch(() => folderStore.currentFolderId, async (newFolderId) => {
    await refreshVisibleUnits(newFolderId);
  }, {immediate: true});

  return {
    createNew,
    visibleUnits,
  };
});
