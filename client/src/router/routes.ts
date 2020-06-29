import { RouteConfig } from 'vue-router';

import home from './home';
import admin from './admin';
import user from './user';
import signin from './signin';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...home,
      ...admin,
      ...user
    ],
    meta: {
      requiresAuth: true
    }
  },
  ...signin
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
