import { RouteConfig } from 'vue-router';

const platesRoutes: RouteConfig[] = [
  {
    path: 'plates/create',
    name: 'AdminPlatesCreate',
    component: () => import('pages/admin/plates/Create.vue')
  }
];

export default platesRoutes;
