import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/loginStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LogIn.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/testView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dummy',
      name: 'dummy',
      component: () => import('../views/dummyView.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Hvis auth ikke er initialiseret endnu
  if (authStore.loading) {
    await authStore.initializeAuth();
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = authStore.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    // Gem den oprindelige destination for senere omdirigering
    if (to.path !== '/login') {
      authStore.redirectPath = to.fullPath;
    }
    next('/login');
  } else if ((to.path === '/login') && isAuthenticated) {
    // Omdiriger til den gemte path eller standard route
    next(authStore.redirectPath || '/test');
    authStore.redirectPath = null; // Nulstil efter brug
  } else {
    next();
  }
});

export default router;
