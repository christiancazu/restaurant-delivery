import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/signin',
    component: () => import('layouts/SignInLayout.vue')
  }
];

export default routes;
