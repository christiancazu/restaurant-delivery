import {
  User,
  Session
} from '@core/interfaces';

export default {
  user: {
    id: null,
    name: '',
    lastname: '',
    email: ''
  } as User,

  isLogged: false
} as Session;
