// Conversation of linear momentum
// m1u1 + m2u2 = m1v1 + m2v2
// Conversation of kinetic potential
// ½m1(u1·u1) + ½m2(u2·u2) = ½m1(v1·v1) + ½m2(v2·v2)
// <=> m1(u1·u1 − v1·v1) = −m2(u2·u2 − v2·v2)
// <=> m1(u1 − v1)·(u1 + v1) = −m2(u2 − v2)·(u2 + v2)
// d = (x1 − x2)/|x1 − x2|
// The change in momentum is given by
// m1(u1 − v1) = −m2(u2 − v2) = ad
// => v1 = u1 − (a/m1)d
// => v2 = u2 + (a/m2)d
// => d·(u1 + v1) = d·(u2 + v2) (from lines 6 and 9)
// <=> d·(2u1 − (a/m1)d) = d·(2u2 + (a/m2)d)
// <=> a = 2d·(u1 − u2)/[1/m1 + 1/m2]

const {
  keys4,
  emptyVector4,
  addVectors4,
  areSphereCollinding,
  cantor,
  distance4,
  distanceSquare4,
  inverseCantor,
  multiplyVector4ByScalar,
  normalizeVector4,
  substractVectors4,
  extractPositionDerivativeVector,
  dotProduct4,
} = require('./math')
const debug = require('./debug')

function assignPostCollisionSpeeds(b1, b2) {
  const d = normalizeVector4(substractVectors4(b1, b2))
  const u1 = extractPositionDerivativeVector(b1, 1)
  const u2 = extractPositionDerivativeVector(b2, 1)

  const a = dotProduct4(multiplyVector4ByScalar(d, 2), substractVectors4(u1, u2)) / (1 / b1.mass + 1 / b2.mass)

  const v1 = addVectors4(u1, multiplyVector4ByScalar(d, -a / b1.mass))
  const v2 = addVectors4(u2, multiplyVector4ByScalar(d, a / b2.mass))

  debug('u1', b1.id, u1)
  debug('v1', b1.id, v1)
  debug('u2', b2.id, u2)
  debug('v2', b2.id, v2)

  keys4.forEach(key => {
    b1[`d${key}`] = v1[key]
    b2[`d${key}`] = v2[key]
  })
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

    return collisions
  }, {})

  debug('collisions', collisions)

  Object.entries(collisions).forEach(([key, values]) => {
    resolveCollision(key, values, bodies)
  })
}

function resolveCollision(i1, indexes, bodies) {
  assignPostCollisionSpeeds(bodies[i1], bodies[indexes[0]])

  // console.log('bodies[i1]', bodies[i1].db)
  // console.log('bodies[indexes[0]]', bodies[indexes[0]].db)
}

module.exports = {
  assignPostCollisionSpeeds,
  handleCollisions,
  resolveCollision,
}
