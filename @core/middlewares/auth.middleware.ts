import {
  sessionService,
  authService
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
        next({ name: 'SignIn' });
      }
    }
  }

  next();
};
