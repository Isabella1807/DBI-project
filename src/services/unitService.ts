import {db} from '@/configs/firebase';
import {
  collection,
  addDoc,
  FirestoreError,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import type {BaseUnitType, unitInputType, UnitTypeWithId} from '@/types/unitTypes.ts';
import { useLoginStore } from '@/stores/loginStore.ts';

// create new unit
export const createUnit = async (unit: Omit<BaseUnitType, 'userId'>): Promise<UnitTypeWithId> => {
  const loginStore = useLoginStore();

  if (!loginStore.userId) {
    throw new Error('User not authenticated');
  }

  if (unit.name.trim() === '') {
    throw new Error('Enhed mangler et navn');
  }

  try {
    const unitWithUserId = {
      ...unit,
      userId: loginStore.userId,
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
  const loginStore = useLoginStore();

  if (!loginStore.userId) {
    throw new Error('User not authenticated');
  }

  try {
    const q = query(
      collection(db, 'units'),
      where('parentId', '==', currentFolderId),
      where('userId', '==', loginStore.userId),
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

export const updateUnitById = async (unitId: string, updatedUnitValues: unitInputType) => {
  try {
    await updateDoc(doc(db, 'units', unitId), {
      ...updatedUnitValues,
    });
  } catch (error) {
    throw new Error('Kunne ikke ændre enhed: ' + (error as FirestoreError).message);
  }
};

export const changeUnitParentId = async (unitId: string, parentId: string) => {
  try {
    await updateDoc(doc(db, 'units', unitId), {parentId});
  } catch (error) {
    throw new Error('Kunne ikke opdatere parentId på enhed: ' + (error as FirestoreError).message);
  }
};


