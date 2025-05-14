import {db} from '@/configs/firebase';
import {collection, addDoc, FirestoreError, getDocs, query, where} from 'firebase/firestore';
import type {BaseUnitType, UnitTypeWithId} from '@/types/unitTypes.ts';

// create new unit
export const createUnit = async (unit: BaseUnitType): Promise<UnitTypeWithId> => {
  //only checking name, because the other fields are optional
  if (unit.name.trim() === '') {
    throw new Error('Enhed mangler et navn');
  }

  try {
    const res = await addDoc(collection(db, 'units'), unit);

    return {
      ...unit,
      id: res.id,
    } as UnitTypeWithId;

  } catch (error) {
    throw new Error('Enhed kunne ikke oprettes: ' + (error as FirestoreError).message);
  }
};

export const getAllUnitsByFolderId = async (currentFolderId: string | null): Promise<UnitTypeWithId[]> => {
  try {
    const q = query(collection(db, 'units'), where('parentId', '==', currentFolderId));
    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id, ...doc.data(),
    }));
    return results as UnitTypeWithId[];

  } catch (error) {
    throw new Error('Kunne ikke finde enhed(er): ' + (error as FirestoreError).message);
  }
};

