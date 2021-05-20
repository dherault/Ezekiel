const Redis = require('ioredis')
const { RedisPubSub } = require('graphql-redis-subscriptions')

const { redisHost, redisPort } = require('./configuration')

const options = {
  host: redisHost,
  port: redisPort,
  retryStrategy: times => Math.min(times * 50, 2000),
}

module.exports = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})
