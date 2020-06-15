import { Session } from '@core/interfaces';

const session: Session = {
  user: {
    id: null,
    email: '',
    roles: []
  },
  isLogged: false
};

export default session;
