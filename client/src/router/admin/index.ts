import platesRoutes from './plates';
import cardsRoutes from './cards';

import { RouteConfig } from 'vue-router';
import adminMiddleware from '@core/middlewares/admin.middleware';

const adminRoutes: RouteConfig = {
  path: 'admin',
  component: () => import('pages/admin/Index.vue'),
  children: [
    ...platesRoutes,
    ...cardsRoutes
  ],
  beforeEnter: adminMiddleware
};

export default adminRoutes;
