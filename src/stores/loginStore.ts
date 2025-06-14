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
import {computed, type Ref, ref} from 'vue';

export const useLoginStore = defineStore('loginStore', () => {
  const user: Ref<User | null> = ref(null);
  const loading: Ref<boolean> = ref(true);
  const errorMessage: Ref<string | null> = ref(null);
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
      errorMessage.value = null;

      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      user.value = userCredential.user;
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Login fejlede';
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const logout = async() => {
    try {
      await signOut(auth);
      user.value = null;
      redirectPath.value = null; // Nulstil redirectPath ved logout
    } catch (error) {
      console.error('Logout fejl:', error);
      throw error;
    }
  };

  const isAuthenticated = computed(() => {
    return !!user.value; //authenticated if user.value is not null
  });

  const userId = computed(() => {
    return user.value?.uid || null;
  });

  return {
    loading,
    errorMessage,
    redirectPath,
    initializeAuth,
    login,
    logout,
    isAuthenticated,
    userId,
  };
});
