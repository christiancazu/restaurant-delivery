import { boot } from 'quasar/wrappers';

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';

import { storageService } from '@core/services';
import { session } from '@core/cache';
import typeDefs from '@core/graphql/typeDefs';
import resolvers from '@core/graphql/resolvers';
import { notifyUtil } from '@core/utils';

import router from '@/router';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = storageService.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const errorLink = onError(({ response }) => {
  try {
    // prevents Unauthorized notification on root path

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!(response.errors[0].message === 'Unauthorized' && router.history.current.path === '/')) {
      const messageError = response.errors[0].extensions.exception.response.message;

      if (messageError) {
        notifyUtil.error(messageError);
      }
    }
  } catch (error) { }
});

const httpLink = createHttpLink({
  uri: process.env.API_GRAPHQL_URL.replace(/"/g, '')
});

const cache = new InMemoryCache({
  addTypename: false
});

export const apolloClient = new ApolloClient({
  link: from([
    authLink, errorLink, httpLink
  ]),
  cache,
  resolvers,
  typeDefs
});

cache.writeData({
  data: {
    session
  }
});

export default boot(({ app }) => {
  app.setup = () => {
    provide(DefaultApolloClient, apolloClient);
    return {};
  };
});
