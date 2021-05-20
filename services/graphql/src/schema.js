const { gql } = require('apollo-server')

module.exports = gql`
type Body {
  id: ID
  parentId: ID
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
  body: Body
  time: String
}
`
