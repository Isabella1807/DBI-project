import {collection, addDoc} from 'firebase/firestore';
import {db} from '@/configs/firebase';


//CREATE ENTITY
const createEntity = async (name: string, description: string, syncId: string, folderId: string) => {
  await addDoc(collection(db, 'tester'), {
    entityName: name,
    entityDescription: description,
    entitySyncId: syncId,
    parentFolder: folderId,
  });
};

//READ ENTITY

//UPDATE ENTITY

//DELETE ENTITY


export default {
  createEntity,
};
