import { Route, NavigationGuardNext } from 'vue-router';

import { sessionService } from '@core/services';

const STAFF_ROLES = ['SUPER_ADMIN', 'ADMIN'];

export default (to: Route, from: Route, next: NavigationGuardNext<Vue>): any => {
  // TODO: improve session context fires update after session.me() is fetched on auth.middleware
  setTimeout(() => {
    const { session: { user } } = sessionService.get();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const hasStaffRole = user.roles.find(role => STAFF_ROLES.includes(role.name));
    if (hasStaffRole) next();
    else next({ name: 'Home' });
  }, 1);
};
