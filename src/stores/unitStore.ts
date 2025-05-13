import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {createUnit} from '@/services/unitService.ts';

export const useUnitStore = defineStore('unitStore', () => {

  const visibleUnits: UnitTypeWithId[] = [];

  const createNew = (unit: unitInputType) => {
    //console.log(unit);

    const folderStore = useFolderStore();
    //console.log(folderStore.currentFolderName, folderStore.currentFolderId);

    createUnit({
      ...unit,
      parentId: folderStore.currentFolderId,
    }).then(createdUnit => {
      console.log(createdUnit);
      visibleUnits.push(createdUnit);
    }).catch(error => {
      console.log(error);
    });
  };

  return {
    createNew,
    visibleUnits
  };
});
