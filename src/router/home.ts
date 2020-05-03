import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '',
    component: () => import('pages/Index.vue')
  }
];

export default routes;
