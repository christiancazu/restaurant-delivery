import cardsRoutes from './cards';

import { RouteConfig } from 'vue-router';

const clientRoutes: RouteConfig = {
  path: '',
  component: () => import('pages/Index.vue'),
  children: [
    {
      path: '/',
      name: 'Home',
      component: () => import('pages/Home.vue')
    },
    ...cardsRoutes
  ]
};

export default clientRoutes;
