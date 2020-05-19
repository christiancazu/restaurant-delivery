import { apolloClient } from '@/boot/apollo';
import { Credentials } from '@core/interfaces';
import { sessionService } from '@core/services';
import { ME_QUERY } from '@core/graphql/querys';
import { SIGN_IN_MUTATION } from '@core/graphql/mutations';

export default {
  async me () {
    const { data: { me } } = await apolloClient.query({
      query: ME_QUERY
    });
    sessionService.set({ user: me });
  },

  async signIn (variables: Credentials) {
    const { data: { signIn } } = await apolloClient.mutate({
      mutation: SIGN_IN_MUTATION,
      variables
    });
    sessionService.set(signIn);
  }
};
