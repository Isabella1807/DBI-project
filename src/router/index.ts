import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/loginStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: 'auth' },
    },
        {
      path: '/opret',
      name: 'opret',
      component: () => import('@/views/SignUpView.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/enheder',
      name: 'enheder',
      component: () => import('@/views/UnitsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/rapporter',
      name: 'rapporter',
      component: () => import('@/views/ReportsView.vue'),
    },
    {
      path: '/skemaer',
      name: 'skemaer',
      component: () => import('@/views/SchemaView.vue'),
    },
    {
      path: '/brugere',
      name: 'brugere',
      component: () => import('@/views/UsersView.vue'),
    },
    {
      path: '/dokumenter',
      name: 'dokumenter',
      component: () => import('@/views/DocumentsView.vue'),
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: () => import('@/views/CalendarView.vue'),
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
    if (to.path !== '/login/') {
      authStore.redirectPath = to.fullPath;
    }
    next('/login');
  } else if ((to.path === '/login') && isAuthenticated) {
    // Omdiriger til den gemte path eller standard route
    next(authStore.redirectPath || '/enheder');
    authStore.redirectPath = null; // Nulstil efter brug
  } else {
    next();
  }
});

export default router;
