import { defineStore } from 'pinia';
import { auth } from '@/configs/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  type User,
} from 'firebase/auth';
import {type Ref, ref} from 'vue';

export const useLoginStore = defineStore('loginStore', () => {
  const user: Ref<User | null> = ref(null);
  const loading: Ref<boolean> = ref(true);
  const error: Ref<string | null> = ref(null);
  const redirectPath: Ref<string | null> = ref(null);

  const initializeAuth = async () => {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (loggedInUser) => {
        user.value = loggedInUser;
        loading.value = false;
        resolve();
      });
    });
  };

  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.user = userCredential.user;
    } catch (error: unknown) { // Fjernet any type
      this.error = error instanceof Error ? error.message : 'Login fejlede';
      throw error;
    } finally {
      this.loading = false;
    }
  };

  return {
  };
});
