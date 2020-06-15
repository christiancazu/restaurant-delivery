import { apolloClient } from '@/boot/apollo';
import { SESSION_QUERY } from '@core/graphql/querys';
import { storageService } from '@core/services';
import { Session } from '@core/interfaces';
import { ref } from '@vue/composition-api';

export default {
  get () {
    const session = ref(apolloClient.readQuery({ query: SESSION_QUERY }));

    const subscription = apolloClient.watchQuery({
      query: SESSION_QUERY
    }).subscribe({
      next ({ data }) {
        session.value = data.session;
      },
      error: (e) => console.log(e)
    });

    return {
      session,
      subscription
    };
  },

  set ({ user, token }: Session) {
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

  close () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { subscription } = this.get();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    subscription.unsubscribe();

    apolloClient.cache.reset();
    apolloClient.resetStore();

    storageService.purgeToken();
  }
};
