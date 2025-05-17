import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/styles/main.scss';
import App from './App.vue';
import router from './router';
import { auth } from '@/configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const app = createApp(App);

// Opret Pinia store
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Initialiser auth state før app mount
const initAuth = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

// Vent på auth initialisering før app mount
initAuth().then(() => {
  app.mount('#app');
});
