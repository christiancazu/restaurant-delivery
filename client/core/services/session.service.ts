import { apolloClient } from '@/boot/apollo';
import { SESSION_QUERY } from '@core/graphql/querys';
import { storageService } from '@core/services';
import { Session } from '@core/interfaces';
import { SET_SESSION_MUTATION } from '../graphql/mutations/session.mutation';

export default {
  get () {
    return {
      ...apolloClient.readQuery({ query: SESSION_QUERY })
    };
  },

  set ({ user, token }: Session) {
    apolloClient.mutate({
      mutation: SET_SESSION_MUTATION,
      update (cache) {
        cache.writeQuery({
          query: SESSION_QUERY,
          data: {
            session: {
              isLogged: true,
              user
            }
          }
        });
      }
    });

    if (token) {
      storageService.setToken(token);
    }
  },

  close () {
    apolloClient.resetStore();
    apolloClient.clearStore();

    apolloClient.mutate({
      mutation: SET_SESSION_MUTATION,
      update (cache) {
        cache.writeQuery({
          query: SESSION_QUERY,
          data: {
            session: {
              user: {
                id: null,
                email: '',
                roles: []
              },
              isLogged: false
            }
          }
        });
        storageService.purgeToken();
      }
    });
  }
};
