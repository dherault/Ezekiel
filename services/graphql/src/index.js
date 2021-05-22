const { ApolloServer } = require('apollo-server')

const db = require('../../database/pubsub')
const pubsub = require('../../database/pubsub')

const { developmentPort } = require('./configuration')

const schema = require('./schema')

const port = process.env.PORT || developmentPort

const resolvers = {
  Query: {
    env: () => process.env.NODE_ENV,
  },
  Mutation: {
    async resetBodies() {
      const keys = ['a', 'b', 'c', 'd', 'e']
      const emptyPos = {}

      keys.forEach(key => {
        emptyPos[key] = 0
        emptyPos[`d${key}`] = 0
        emptyPos[`dd${key}`] = 0
      })

      await db.Body.update({
        id: 1,
        ...emptyPos,
      })
      await db.Body.update({
        id: 2,
        ...emptyPos,
        e: -256,
      })
      await db.Body.update({
        id: 3,
        ...emptyPos,
        e: 256,
      })

      console.log('reseted')

      return true
    },
  },
  Subscription: {
    debug: {
      subscribe: () => pubsub.asyncIterator(['DEBUG']),
    },
    time: {
      subscribe: () => pubsub.asyncIterator(['UPDATE_TIME']),
    },
    bodies: {
      subscribe: () => pubsub.asyncIterator(['UPDATE_BODIES']),
    },
  },
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  subscriptions: {
    path: '/subscriptions',
    onConnect() {
      console.log('Connected!')
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  },
  context({ req, connection }) {
    if (connection) {
      // Operation is a Subscription
      const token = connection.context.authorization || ''

      return { token }
    }
    // Operation is a Query/Mutation
    const token = req.headers.authorization || ''

    return { token }
  },
  introspection: true,
  playground: true,
})

server.listen(port).then(() => {
  console.log('Ezekiel GraphQL server listening on port', port)
})
