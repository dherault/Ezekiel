const pubsub = require('../../database/pubsub')

const physica = require('./physics')

setInterval(() => {
  pubsub.publish('UPDATE_TIME', { time: new Date().toISOString() })
  physica(100)
}, 100)

console.log('Ezekiel spacetime launched')
