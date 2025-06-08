//CREATE FOLDER
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs, onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {db} from '@/configs/firebase.ts';
import {useAuthStore} from '@/stores/loginStore.ts';
import type {Folder} from '@/types/folderTypes.ts';
import type {Ref} from 'vue';

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
export const deleteFolderAndChildren = async (id: string) => {
  const authStore = useAuthStore();
  // 1) Recurse into sub-folders owned by this user
  const subFolderQ = query(
    collection(db, 'folders'),
    where('parentId', '==', id),
    where('userId', '==', authStore.userId),
  );
  const subFolderSnap = await getDocs(subFolderQ);
  for (const folderDoc of subFolderSnap.docs) {
    await deleteFolderAndChildren(folderDoc.id);
  }

  // 2) Delete any units in this folder
  const unitQ = query(
    collection(db, 'units'),
    where('folderId', '==', id),
    where('userId', '==', authStore.userId),
  );
  const unitSnap = await getDocs(unitQ);
  for (const unitDoc of unitSnap.docs) {
    await deleteDoc(doc(db, 'units', unitDoc.id));
  }

  // 3) Finally delete the folder itself
  await deleteDoc(doc(db, 'folders', id));
};

//RENAME FOLDER
export const updateFolderName = async (newFolderName: string, folderIdToChange: string) => {
  try {
    await updateDoc(doc(db, 'folders', folderIdToChange), {name: newFolderName.trim()});
  } catch (error) {
    throw new Error('Kunne ikke ændre folder navn' + (error as FirestoreError).message);
  }
};

//UPDATE FOLDER PARENTID
export const updateFolderParentId = async (folderId: string, newParentId: string) => {
  try {
    await updateDoc(doc(db, 'folders', folderId), {parentId: newParentId});
  } catch (error) {
    throw new Error('Kunne ikke ændre folder parent id' + (error as FirestoreError).message);
  }
};

let firebaseFolderUnsubscribeFunction = () => {};

//SUBSCRIBE TO FOLDER
export const subscribeToFolder = (folderToSubscribeId: string | null, folderArray: Ref<Folder[]>) => {
  unsubscribeFromFolder();

  const authStore = useAuthStore();

  const queryParentId = query(
    collection(db, 'folders'),
    where('parentId', '==', folderToSubscribeId),
    where('userId', '==', authStore.userId),
  );

  firebaseFolderUnsubscribeFunction = onSnapshot(queryParentId, snap => {
    folderArray.value = snap.docs.map(result => ({
      id: result.id,
      name: result.data().name as string,
      selected: false,
      type: 'folder',
    }));
  });
};

export const unsubscribeFromFolder = () => {
  firebaseFolderUnsubscribeFunction();
};
