import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { WebSocketLink } from 'apollo-link-ws';
import { getFragmentDefinitions, getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { AUTH_TOKEN_NAME } from './consts';
require('dotenv').config('../../.env');

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 3,
    retryIf: (error, { query }) => {
      const { operation } = getMainDefinition(query);
      return operation === 'query';
    }
  }
});

// // const subscriptionClient = new SubscriptionClient(
// //   process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_URL,
// //   {
// //     inactivityTimeout: 0,
// //     reconnect: true,
// //     timeout: 30000
// //   }
// // );

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        'multiple errors',
        JSON.stringify({ message, locations, path })
      );
      return message;
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

// // const wsLink = new WebSocketLink(subscriptionClient);

// wsLink,
const authLink = setContext((_, context) => {
  const { headers } = context;
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return {
    ...context,
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

export default new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from([authLink, errorLink, retryLink, httpLink]),
  connectToDevTools: true,
  cache: new InMemoryCache()
});
