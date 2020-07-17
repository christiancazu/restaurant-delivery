import { RouteConfig } from 'vue-router';

const cardsRoutes: RouteConfig[] = [
  {
    path: 'cards/daily',
    name: 'AdminCardsDaily',
    component: () => import('pages/admin/cards/Daily.vue')
  }
];

export default cardsRoutes;
