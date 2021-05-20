export const isProduction = process.env.NODE_ENV === 'production'

export const graphqlServiceHost = isProduction
  ? 'https://graphql.ezekiel.love'
  : 'http://localhost:5001'

export const graphqlWsServiceHost = isProduction
  ? 'wss://graphql.ezekiel.love/subscriptions'
  : 'ws://localhost:5001/subscriptions'

export const authorizationTokenLocalstorageKey = 'ezekiel-authorization-token'
