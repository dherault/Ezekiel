const db = require('../../database')
const pubsub = require('../../database/pubsub')

const {
  addVectors4,
  // areSphereCollinding,
  // cantor,
  // distance4,
  distanceSquare4,
  // inverseCantor,
  multiplyVector4ByScalar,
  normalizeVector4,
  substractVectors4,
} = require('./math')
const {
  handleCollisions,
} = require('./collision')

const gravitationalConstant = 1
const keys4 = ['a', 'b', 'c', 'd']

const emptyVector4 = {}

keys4.forEach(key => emptyVector4[key] = 0)

async function physica(deltaTime) {
  const bodies = await db.Body.findAll()

  const nextBodies = step(deltaTime, bodies)

  console.log('nextBodies', nextBodies.map(b => [b.a, b.b, b.c, b.d, b.e].join(' ')))

  handleCollisions(bodies, nextBodies)

  console.log('nextBodies[0].db', nextBodies[0].id, nextBodies[0].db)
  console.log('nextBodies[1].db', nextBodies[1].id, nextBodies[1].db)

  const promises = []

  bodies.forEach((b, i) => {
    promises.push(
      b.update(nextBodies[i]),
      pubsub.publish('UPDATE_BODY', { body: b.toJSON() }),
    )
  })

  await Promise.all(promises)
}

function step(deltaTime, bodies) {
  const results = []

  bodies.forEach(b => {
    results.push({
      ...b.toJSON(),
      ...stepPosition4(deltaTime, bodies, b),
    })
  })

  return results
}

function stepPosition4(deltaTime, bodies, b1) {
  const nextPl1 = {}

  const sumForces = bodies.reduce((force, b2) => (
    b1.id === b2.id ? force : addVectors4(force, gravitationalForce4(b1, b2))
  ), { ...emptyVector4 })

  const acceleration = multiplyVector4ByScalar(sumForces, 1 / b1.mass)

  keys4.forEach(key => {
    nextPl1[`dd${key}`] = acceleration[key]
    nextPl1[`d${key}`] = b1[`d${key}`] + acceleration[key] * deltaTime
    nextPl1[key] = b1[key] + nextPl1[`d${key}`] * deltaTime
  })

  return nextPl1
}

function gravitationalForce4(b1, b2) {
  const norm = gravitationalConstant * b1.mass * b2.mass / distanceSquare4(b1, b2)

  return multiplyVector4ByScalar(normalizeVector4(substractVectors4(b2, b1)), norm)
}

// function computeMassBarycenter(bodies) {
//   let barycenter = { ...emptyVector4 }

//   bodies.forEach(b => {
//     barycenter = addVectors(barycenter, multiplyVectorByScalar(b, b.mass))
//   })

//   keys4.forEach(key => {
//     barycenter[key] /= bodies.length
//   })

//   return barycenter
// }

function isLockedIn5d(b1, b2) {
  return b2.e - b1.e < Math.max(b1.radius, b2.radius)
}

/* ---
  Algebra
--- */

module.exports = physica
