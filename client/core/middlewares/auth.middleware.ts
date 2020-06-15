import { Route, NavigationGuardNext, RouteRecord } from 'vue-router';

import {
  sessionService,
  authService,
  notifyService
} from '@core/services';

export default async (to: Route, from: Route, next: NavigationGuardNext<Vue>): Promise<any> => {
  if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
    const { session: { isLogged } } = sessionService.get();

    if (isLogged) {
      next();
    } else {
      try {
        await authService.me();
        next();
      } catch (error) {
        notifyService.error('session.errors.notValid');
        next({ name: 'SignIn' });
      }
    }
  } else {
    next();
  }
};
