import { apolloClient } from '@/boot/apollo';
import { SESSION_QUERY } from '@core/graphql/querys';
import { storageService } from '@core/services';
import { session } from '@core/cache';
import { Session } from '@core/interfaces';

export default {
  get: () => {
    const {
      session: { isLogged, user, token }
    } = apolloClient.readQuery({
      query: SESSION_QUERY
    });

    return {
      isLogged,
      user,
      token
    };
  },

  set: ({ user, token }: Session) => {
    apolloClient.writeQuery({
      query: SESSION_QUERY,
      data: {
        session: {
          isLogged: true,
          user
        }
      }
    });

    if (token) {
      storageService.setToken(token);
    }
  },

  close: () => {
    apolloClient.writeQuery({
      query: SESSION_QUERY,
      data: {
        session
      }
    });
    storageService.purgeToken();
  }
};
