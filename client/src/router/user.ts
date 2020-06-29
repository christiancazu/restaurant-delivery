import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: 'user/:module',
    name: 'User',
    component: () => import('pages/user/Index.vue')
  }
];

export default routes;
