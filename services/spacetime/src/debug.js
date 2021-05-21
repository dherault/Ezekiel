const pubsub = require('../../database/pubsub')

function debug(...args) {
  console.log('debug', ...args)

  return pubsub.publish('DEBUG', { debug: args.join(' ') })
}

module.exports = debug
