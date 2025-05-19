// stores/unitStore.ts
import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {createUnit, deleteUnitById, getAllUnitsByFolderId} from '@/services/unitService.ts';
import {ref, type Ref, watch, computed} from 'vue';
import { useAuthStore } from '@/stores/loginStore';

export const useUnitStore = defineStore('unitStore', () => {
  const folderStore = useFolderStore();
  const authStore = useAuthStore();
  const units: Ref<UnitTypeWithId[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const createNew = async (unit: unitInputType) => {
    try {
      loading.value = true;
      const newUnit = await createUnit({
        ...unit,
        parentId: folderStore.currentFolderId,
      });
      units.value.push(newUnit);
      return newUnit;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const refreshVisibleUnits = async (newFolderId: string | null) => {
    try {
      loading.value = true;
      if (!authStore.userId) {
        units.value = [];
        return;
      }
      units.value = await getAllUnitsByFolderId(newFolderId);
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      units.value = [];
    } finally {
      loading.value = false;
    }
  };

  watch(() => folderStore.currentFolderId, async (newFolderId) => {
    await refreshVisibleUnits(newFolderId);
  }, {immediate: true});

  const deleteById = async (unitId: string) => {
    try {
      await deleteUnitById(unitId);
      units.value = units.value.filter(unit => unit.id !== unitId);
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    }
  };

  const getUnitById = (unitId: string): UnitTypeWithId | undefined => {
    return units.value.find(unit => unit.id === unitId);
  };

  const updateUnit = (unit: UnitTypeWithId) => {
    // Implementer senere
    return unit;
  };

  const visibleUnits = computed(() => units.value);

  return {
    createNew,
    visibleUnits,
    getUnitById,
    deleteById,
    updateUnit,
    loading,
    error,
  };
});
