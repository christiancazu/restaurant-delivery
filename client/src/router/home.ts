import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '',
    name: 'Home',
    component: () => import('pages/Index.vue')
  }
];

export default routes;
