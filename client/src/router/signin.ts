import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('layouts/SignInLayout.vue')
  }
];

export default routes;
