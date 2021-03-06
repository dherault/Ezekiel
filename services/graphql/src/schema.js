const { gql } = require('apollo-server')

module.exports = gql`
type Body {
  id: ID
  mass: Float
  radius: Float
  a: Float
  b: Float
  c: Float
  d: Float
  e: Float
  da: Float
  db: Float
  dc: Float
  dd: Float
  de: Float
  dda: Float
  ddb: Float
  ddc: Float
  ddd: Float
  dde: Float
}

type Query {
  env: String
}

type Mutation {
  resetBodies: Boolean!
}

type Subscription {
  bodies: [Body]
  time: String
  debug: String
}
`
