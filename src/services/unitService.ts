// services/unitservice.ts
import {db} from '@/configs/firebase';
import {collection, addDoc, FirestoreError, getDocs, query, where, deleteDoc, doc} from 'firebase/firestore';
import type {BaseUnitType, UnitTypeWithId} from '@/types/unitTypes.ts';
import { useAuthStore } from '@/stores/loginStore';

// create new unit
export const createUnit = async (unit: Omit<BaseUnitType, 'userId'>): Promise<UnitTypeWithId> => {
  const authStore = useAuthStore();

  if (!authStore.userId) {
    throw new Error('User not authenticated');
  }

  if (unit.name.trim() === '') {
    throw new Error('Enhed mangler et navn');
  }

  try {
    const unitWithUserId = {
      ...unit,
      userId: authStore.userId,
    };

    const res = await addDoc(collection(db, 'units'), unitWithUserId);

    return {
      ...unitWithUserId,
      id: res.id,
    } as UnitTypeWithId;
  } catch (error) {
    throw new Error('Enhed kunne ikke oprettes: ' + (error as FirestoreError).message);
  }
};

export const getAllUnitsByFolderId = async (currentFolderId: string | null): Promise<UnitTypeWithId[]> => {
  const authStore = useAuthStore();

  if (!authStore.userId) {
    throw new Error('User not authenticated');
  }

  try {
    const q = query(
      collection(db, 'units'),
      where('parentId', '==', currentFolderId),
      where('userId', '==', authStore.userId),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UnitTypeWithId[];
  } catch (error) {
    throw new Error('Kunne ikke finde enhed(er): ' + (error as FirestoreError).message);
  }
};

export const deleteUnitById = async (unitId: string) => {
  try {
    await deleteDoc(doc(db, 'units', unitId));
  } catch (error) {
    throw new Error('Kunne ikke slette enhed: ' + (error as FirestoreError).message);
  }
};
