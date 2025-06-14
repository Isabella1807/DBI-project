import { getAuth } from 'firebase/auth';
import {
  addDoc,
  getDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/configs/firebase';


import {defineStore} from 'pinia';
import type {unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import {useFolderStore} from '@/stores/folderStore.ts';
import {
  createUnit,
  deleteUnitById,
  getAllUnitsByFolderId,
  updateUnitById,
  changeUnitParentId,
} from '@/services/unitService.ts';
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
    updateUnitById(unit.id, {
      name: unit.name,
      description: unit.description,
      syncId: unit.syncId,
    }).then(() => {
      const unitIndex = visibleUnits.value.findIndex(item => item.id === unit.id);
      if (unitIndex >= 0) {
        visibleUnits.value[unitIndex] = unit;
      }
    }).catch((error) => {
      throw new Error(error);
    });
  };

  const idBelongsToUnit = (unitId: string): boolean => {
    return !!visibleUnits.value.find((item) => {
      return item.id === unitId;
    });
  };

  const changeParentId = (unitId: string, newParentId: string) => {
    changeUnitParentId(unitId, newParentId).then(() => {
      visibleUnits.value = visibleUnits.value.filter(unit => unit.id !== unitId);
    }).catch(error => {
      throw new Error('Kunne ikke opdatere parent id på enhed: ' + error);
    });
  };

  /** Copy a single unit and update visibleUnits */
  async function copyUnit(
    originalUnit: UnitTypeWithId,
    newName: string,
    newParentId: string | null
  ): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    // build the new document payload
    const payload = {
      ...originalUnit,
      name: newName,
      parentId: newParentId,    // ← important: use parentId
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    delete (payload as any).id;

    // write it
    const newRef = await addDoc(collection(db, 'units'), payload);

    // fetch the created doc so we know its fields / id
    const snap = await getDoc(newRef);
    if (snap.exists()) {
      const newUnit: UnitTypeWithId = {
        id: snap.id,
        ...(snap.data() as Omit<UnitTypeWithId, 'id'>),
      };
      // push into your UI list
      visibleUnits.value.push(newUnit);
    }
  }


  return {
    createNew,
    visibleUnits,
    getUnitById,
    deleteById,
    updateUnit,
    refreshVisibleUnits,
    idBelongsToUnit,
    changeParentId,
    copyUnit,
  };
});
