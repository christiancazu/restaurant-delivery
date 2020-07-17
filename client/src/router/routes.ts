import { RouteConfig } from 'vue-router';
import adminRoutes from './admin';
import clientRoutes from './client';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      adminRoutes,
      clientRoutes
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('layouts/SignInLayout.vue')
  },
  {
    path: '/api'
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
