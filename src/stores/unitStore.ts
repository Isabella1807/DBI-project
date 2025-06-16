import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useBreadcrumbStore} from '@/stores/breadcrumbStore.ts';
import {
  createUnit,
  deleteUnitById,
  updateUnitById,
  changeUnitParentId,
  subscribeToUnitParent, unsubscribeFromUnitParent,
} from '@/services/unitService.ts';
import {onUnmounted, ref, type Ref, watch} from 'vue';
import {useLoginStore} from '@/stores/loginStore.ts';

export const useUnitStore = defineStore('unitStore', () => {
  const breadcrumbStore = useBreadcrumbStore();
  const visibleUnits: Ref<UnitTypeWithId[]> = ref([]);

  const createNew = async (unit: unitInputType) => {
    await createUnit({
      ...unit,
      parentId: breadcrumbStore.currentFolderId,
    });
  };

  const fetchVisibleUnits = () => {
    subscribeToUnitParent(breadcrumbStore.currentFolderId, visibleUnits);
  };


  watch(() => breadcrumbStore.currentFolderId, async () => {
    fetchVisibleUnits();
  });

  onUnmounted(() => {
    unsubscribeFromUnitParent();
  });

  const deleteById = async (unitId: string) => {
    await deleteUnitById(unitId);
  };

  const getUnitById = (unitId: string): UnitTypeWithId | undefined => {
    return visibleUnits.value.find(unit => {
      return unit.id === unitId;
    });
  };

  const updateUnit = async (unit: UnitTypeWithId) => {
    await updateUnitById(unit.id, {
      name: unit.name,
      description: unit.description,
      syncId: unit.syncId,
    });
  };

  const idBelongsToUnit = (unitId: string): boolean => {
    return !!visibleUnits.value.find((item) => {
      return item.id === unitId;
    });
  };

  const changeParentId = async (unitId: string, newParentId: string) => {
    await changeUnitParentId(unitId, newParentId);
  };

  return {
    createNew,
    visibleUnits,
    getUnitById,
    deleteById,
    updateUnit,
    idBelongsToUnit,
    changeParentId,
    fetchVisibleUnits,
  };
});
