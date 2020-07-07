import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: 'admin/plate',
    name: 'AdminPlate',
    component: () => import('pages/admin/Plate.vue')
  },
  {
    path: 'admin/:module',
    name: 'Admin',
    component: () => import('pages/admin/Index.vue')
  }
];

export default routes;
