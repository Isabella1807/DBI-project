import {db} from '@/configs/firebase';
import {collection, addDoc, FirestoreError} from 'firebase/firestore';
import type {BaseUnitType, UnitTypeWithId} from '@/types/unitTypes.ts';

// create new unit
export const createUnit = async (unit: BaseUnitType): Promise<UnitTypeWithId> => {
  //only checking name, because the other fields are optional
  if (unit.name.trim() === '') {
    throw new Error('Enhed mangler et navn');
  }

  try {
    const res = await addDoc(collection(db, 'units'), {
      unit: unit,
    });

    return {
      ...unit,
      id: res.id,
    };

  } catch (error) {
    throw new Error('Enhed kunne ikke oprettes: ' + (error as FirestoreError).message);
  }
};

