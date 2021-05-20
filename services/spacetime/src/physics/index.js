const db = require('../../../database')
const pubsub = require('../../../database/pubsub')

const gravitationalConstant = 1
const sphereCollisionDelta = Math.sqrt(3)
const keys4 = ['a', 'b', 'c', 'd']

const emptyVector4 = {}

keys4.forEach(key => emptyVector4[key] = 0)

async function physica(deltaTime) {
  const bodies = await db.Body.findAll()

  const nextBodies = step(deltaTime, bodies)

  console.log('nextBodies', nextBodies.map(b => [b.a, b.b, b.c, b.d, b.e].join(' ')))

  handleCollisions(bodies, nextBodies)

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

  return multiplyVector4ByScalar(normalizeVector4(substractVectors4(b1, b2)), norm)
}

function handleCollisions(initialBodies, bodies) {
  const hashes = []

  bodies.forEach((b1, i1) => {
    bodies.forEach((b2, i2) => {
      if (i1 === i2) return

      const hash = cantor(i1, i2)

      if (hashes.includes(hash) || !areSphereCollinding(b1, b2)) return

      hashes.push(hash)
    })
  })

  const collisions = hashes
  .map(inverseCantor)
  .reduce((collisions, { i1, i2 }) => {
    if (!collisions[i1]) collisions[i1] = [i2]
    else collisions[i1].push(i2)

    if (!collisions[i2]) collisions[i2] = [i1]
    else collisions[i2].push(i1)

    return collisions
  }, {})

  console.log('collisions', collisions)

  Object.entries(collisions).forEach(([key, values]) => {
    resolveCollision(key, values, bodies)
  })
}

function resolveCollision(i1, indexes, bodies) {
  let vector = { ...emptyVector4 }

  indexes.forEach(i2 => {
    vector = addVectors4(vector, substractVectors4(bodies[i1], bodies[i2]))
  })

  vector = normalizeVector4(vector)

  const minDistance = Math.min(...indexes.map(i2 => distance4(bodies[i1], bodies[i2])))
  console.log('i1, vector', i1, vector, minDistance)
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

function cantor(x, y) {
  return 0.5 * (x + y) * (x + y + 1) + Math.min(x, y)
}

function inverseCantor(z) {
  const w = Math.floor(0.5 * (Math.sqrt(8 * z + 1) - 1))
  const t = 0.5 * (w * w + w)
  const i2 = z - t

  return {
    i1: w - i2,
    i2,
  }
}

function areSphereCollinding(b1, b2) {
  return distance4(b1, b2) < b1.radius + b2.radius + sphereCollisionDelta
}

function distanceSquare4(v1, v2) {
  let distanceSquare = 0

  keys4.forEach(key => distanceSquare += (v2[key] - v1[key]) ** 2)

  return distanceSquare
}

function distance4(v1, v2) {
  return Math.sqrt(distanceSquare4(v1, v2))
}

function addVectors4(v1, v2) {
  const sumVector = {}

  keys4.forEach(key => {
    sumVector[key] = v1[key] + v2[key]
  })

  return sumVector
}

function substractVectors4(v1, v2) {
  const diffVector = {}

  keys4.forEach(key => {
    diffVector[key] = v2[key] - v1[key]
  })

  return diffVector
}

function multiplyVector4ByScalar(pos, scalar) {
  const scaledVector = {}

  keys4.forEach(key => {
    scaledVector[key] = scalar * pos[key]
  })

  return scaledVector
}

function normalizeVector4(v) {
  let norm = 0

  keys4.forEach(key => norm += v[key] ** 2)

  norm = Math.sqrt(norm)

  return multiplyVector4ByScalar(v, norm === 0 ? 1 : 1 / norm)
}

// function extractPositionDerivativeVector(b, x) {
//   let prefix = ''

//   for (let i = 0; i < x; i++) prefix += 'd'

//   const vector = {}

//   keys4.forEach(key => vector[key] = b[prefix + key])

//   return vector
// }

module.exports = physica
