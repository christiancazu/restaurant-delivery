import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: 'admin/:module',
    name: 'Admin',
    component: () => import('pages/admin/Index.vue')
  }
];

export default routes;
