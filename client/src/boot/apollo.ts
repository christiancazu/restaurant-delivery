import { boot } from 'quasar/wrappers';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { storageService } from '@core/services';
import { session } from '@core/cache';

import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';

type Header = {
  authorization?: string;
}

const getHeaders = () => {
  const headers: Header = {};
  const token = storageService.getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const link = new HttpLink({
  uri: process.env.API_GRAPHQL_URL,
  headers: getHeaders()
});

const cache = new InMemoryCache({
  addTypename: false
});

export const apolloClient = new ApolloClient({
  link,
  cache,
  resolvers: {}
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
