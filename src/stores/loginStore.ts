// stores/auth.ts
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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: true,
    error: null as string | null,
    redirectPath: null as string | null, // Tilføjet redirectPath
  }),

  actions: {
    async initializeAuth() {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          this.loading = false;
          resolve();
        });
      });
    },

    async login(email: string, password: string) {
      try {
        this.loading = true;
        this.error = null;

        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (error: unknown) { // Fjernet any type
        this.error = error instanceof Error ? error.message : 'Login fejlede';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.redirectPath = null; // Nulstil redirectPath ved logout
      } catch (error) {
        console.error('Logout fejl:', error);
        throw error;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    userId: (state) => state.user?.uid || null,
  },
});
