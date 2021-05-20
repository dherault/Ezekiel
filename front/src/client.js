import { createClient, dedupExchange, subscriptionExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { authorizationTokenLocalstorageKey, graphqlServiceHost, graphqlWsServiceHost } from './configuration'
import schema from './graphql-schema.json'

const subscriptionClient = new SubscriptionClient(graphqlWsServiceHost, { reconnect: true })

const client = createClient({
  url: graphqlServiceHost,
  fetchOptions: () => {
    const token = localStorage.getItem(authorizationTokenLocalstorageKey)

    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  },
  exchanges: [
    dedupExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation)
      },
    }),
    cacheExchange({ schema }),
  ],
  requestPolicy: 'cache-and-network',
})

export default client
