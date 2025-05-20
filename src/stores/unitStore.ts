import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {createUnit, deleteUnitById, getAllUnitsByFolderId} from '@/services/unitService.ts';
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
      throw new Error(error);
    });
  };

  const refreshVisibleUnits = async (newFolderId: string | null) => {
    visibleUnits.value = [];
    visibleUnits.value = await getAllUnitsByFolderId(newFolderId);
  };

  watch(() => folderStore.currentFolderId, async (newFolderId) => {
    await refreshVisibleUnits(newFolderId);
  }, {immediate: true});

  const deleteById = (unitId: string) => {
    deleteUnitById(unitId).then(() => {
      const deletedUnitIndex = visibleUnits.value.findIndex((item) => {
        return item.id === unitId;
      });
      if (deletedUnitIndex > -1) {
        visibleUnits.value.splice(deletedUnitIndex, 1);
      }
    }).catch(error => {
      throw new Error(error);
    });
  };

  const getUnitById = (unitId: string): UnitTypeWithId | undefined => {
    return visibleUnits.value.find(unit => {
      return unit.id === unitId;
    });
  };

  const updateUnit = (unit: UnitTypeWithId) => {
    // call service to update this unit
    return unit;
    // then find the unit in the visibleUnits array and update its values
  };

  return {
    createNew,
    visibleUnits,
    getUnitById,
    deleteById,
    updateUnit,
    refreshVisibleUnits,
  };
});
