import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/cards',
    name: 'Cards',
    component: () => import('pages/client/Cards.vue')
  }
];

export default routes;
