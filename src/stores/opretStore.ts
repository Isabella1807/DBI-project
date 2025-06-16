import { defineStore } from 'pinia';
import { auth } from '@/configs/firebase';
import {
  createUserWithEmailAndPassword,
  type User,
} from 'firebase/auth';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async register(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (error: unknown) {
        this.error = error instanceof Error ? error.message : 'Oprettelse fejlede';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
