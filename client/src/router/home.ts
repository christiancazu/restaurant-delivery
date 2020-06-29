import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: ':module',
    name: 'Home',
    component: () => import('pages/Index.vue')
  }
];

export default routes;
