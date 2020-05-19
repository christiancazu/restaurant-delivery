import { User } from '@core/interfaces/user.interface';

export interface Session {
  user?: User;
  isLogged?: boolean;
  token?: string;
}
