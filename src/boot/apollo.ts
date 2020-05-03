import { boot } from 'quasar/wrappers';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo';
import sessionService from 'src/services/session.service';

type Header = {
  authorization?: string;
}

const getHeaders = () => {
  const headers: Header = {};
  const token = sessionService.getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const link = new HttpLink({
  uri: process.env.API_GRAPHQL_URL,
  headers: getHeaders()
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  })
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

export default boot(({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
});
