const pubsub = require('../../database/pubsub')

const physica = require('./physics')

setInterval(() => {
  pubsub.publish('UPDATE_TIME', { time: new Date().toISOString() })
  physica(1)
}, 1000)

console.log('Ezekiel spacetime launched')
