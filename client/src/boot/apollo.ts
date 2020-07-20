import { boot } from 'quasar/wrappers';

import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { provide } from '@vue/composition-api';
import { getMainDefinition } from 'apollo-utilities';

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

// Apollo Client can only have 1 “terminating” Apollo Link that sends the GraphQL requests;
// const httpLink = createHttpLink({
//   uri: process.env.API_GRAPHQL_URL
// });

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const uploadClientLink = createUploadLink({
  uri: process.env.API_GRAPHQL_URL

});

const wsLink = new WebSocketLink({
  uri: process.env.WS_GRAPHQL_URL,
  options: {
    reconnect: true
  }
});

const cache = new InMemoryCache({
  addTypename: false
});

export const apolloClient = new ApolloClient({
  link: split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription';
    },
    wsLink,
    from([
      errorLink, authLink, uploadClientLink /* httpLink */
    ])
  ),
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
  app.setup = () => provide(DefaultApolloClient, apolloClient);
});
