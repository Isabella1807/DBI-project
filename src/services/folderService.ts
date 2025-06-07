//CREATE FOLDER
import {addDoc, collection, FirestoreError, serverTimestamp} from 'firebase/firestore';
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
    throw new Error('Enhed kunne ikke oprettes: ' + (error as FirestoreError).message);
  }
};


//DELETE FOLDER


