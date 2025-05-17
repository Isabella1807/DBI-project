import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/configs/firebase';

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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const user = auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');

  if (requiresAuth && !user) {
    next('/');
  } else {
    next();
  }
});

export default router;
