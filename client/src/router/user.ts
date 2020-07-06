import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: 'user/plate',
    name: 'UserPlates',
    component: () => import('pages/user/Plates.vue')
  },
  {
    path: 'user/:module',
    name: 'User',
    component: () => import('pages/user/Index.vue')
  }
];

export default routes;
