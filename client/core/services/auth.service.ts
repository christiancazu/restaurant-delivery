import { apolloClient } from '@/boot/apollo';
import { Credentials } from '@core/interfaces';
import { sessionService, storageService } from '@core/services';
import { ME_QUERY } from '@core/graphql/querys';
import { SIGN_IN_MUTATION } from '@core/graphql/mutations';
import { SESSION_QUERY } from '../graphql/querys/session.query';
import router from '@/router';

export default {
  async me () {
    const { data: { me } } = await apolloClient.query({
      query: ME_QUERY
    });

    sessionService.set(me);
  },

  signIn ({ email, password }: Credentials) {
    apolloClient.mutate({
      mutation: SIGN_IN_MUTATION,
      variables: {
        email,
        password
      },
      update (cache, { data: { signIn: { user, token } } }) {
        cache.writeQuery({
          query: SESSION_QUERY,
          data: {
            session: {
              isLogged: true,
              user
            }
          }
        });
        storageService.setToken(token);

        router.push({ name: 'Home' });
      }
    });
  }
};
