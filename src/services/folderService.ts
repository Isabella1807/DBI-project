//CREATE FOLDER
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {db} from '@/configs/firebase.ts';
import {useAuthStore} from '@/stores/loginStore.ts';

export const createFolder = async (folderName: string, parentId: string | null, userId: string | null): Promise<void> => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    throw new Error('User not authenticated');
  }

  try {
    await addDoc(collection(db, 'folders'), {
      name: folderName.trim(),
      parentId,
      userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error('Folder kunne ikke oprettes: ' + (error as FirestoreError).message);
  }
};


//DELETE FOLDER


//RENAME FOLDER
export const updateFolderName = async (newFolderName: string, folderIdToChange: string) => {
  try {
    await updateDoc(doc(db, 'folders', folderIdToChange), {name: newFolderName.trim()});
  } catch (error) {
    throw new Error('Kunne ikke ændre folder navn' + (error as FirestoreError).message);
  }
};

