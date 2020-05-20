import {
  sessionService,
  authService,
  notifyService
} from '@core/services';

export default async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { isLogged } = sessionService.get();

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
  }

  next();
};
