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
  // emptyVector4,
  emptyDerivatedVector4,
  addVectors4,
  areSphereCollinding,
  cantor,
  // distance4,
  // distanceSquare4,
  inverseCantor,
  multiplyVector4ByScalar,
  normalizeVector4,
  substractVectors4,
  extractPositionDerivativeVector,
  dotProduct4,
} = require('./math')
const debug = require('./debug')

function handleCollisions(deltaTime, bodies) {
  const hashes = []

  bodies.forEach((b1, i1) => {
    bodies.forEach((b2, i2) => {
      if (i1 === i2) return

      const hash = cantor(i1, i2)

      if (hashes.includes(hash) || !areSphereCollinding(b1, b2)) return

      hashes.push(hash)
    })
  })

  const collisions = hashes.map(inverseCantor).reduce((collisions, { i1, i2 }) => {
    if (!collisions[i1]) collisions[i1] = [i2]
    else collisions[i1].push(i2)

    if (!collisions[i2]) collisions[i2] = [i1]
    else collisions[i2].push(i1)

    return collisions
  }, {})

  /* ---
  collisions = {
    "0": [
      1,
      2
    ],
    "1": [
      0
    ],
    "2": [
      0
    ]
  }
  --- */

  debug('collisions', JSON.stringify(collisions, null, 2))

  const normalizedBodies = {}

  bodies.forEach(b => {
    normalizedBodies[b.id] = b
  })

  Object.entries(collisions).forEach(([index, indexes]) => {
    const b = resolveCollision(index, indexes, bodies)

    normalizedBodies[b.id] = b
  })

  return normalizedBodies
}

function resolveCollision(i1, indexes, bodies) {
  // debug('___')

  // The final body, with updated speed
  // Given an empty speed vector to add the collision speed vectors to
  const bodyCloneAlpha = { ...bodies[i1], ...emptyDerivatedVector4 }
  // The initial body, not updated between collisions
  const bodyClone = { ...bodies[i1] }

  indexes.forEach(i2 => {
    const v1 = computePostCollisionSpeed(bodyClone, bodies[i2])

    keys4.forEach(key => {
      bodyCloneAlpha[`d${key}`] += v1[key]
    })
  })

  // debug('pre collision speed', JSON.stringify(extractPositionDerivativeVector(bodyClone, 1)))
  // debug('post collision speed', JSON.stringify(extractPositionDerivativeVector(bodyCloneAlpha, 1)))

  return bodyCloneAlpha
}

// See equations on top of the page
function computePostCollisionSpeed(b1, b2) {
  const d = normalizeVector4(substractVectors4(b1, b2))
  const u1 = extractPositionDerivativeVector(b1, 1)
  const u2 = extractPositionDerivativeVector(b2, 1)

  const a = dotProduct4(d, substractVectors4(u1, u2)) * 2 / (1 / b1.mass + 1 / b2.mass)

  const v1 = addVectors4(u1, multiplyVector4ByScalar(d, -a / b1.mass))
  // const v2 = addVectors4(u2, multiplyVector4ByScalar(d, a / b2.mass))

  // debug('u1', b1.id, JSON.stringify(u1))
  // debug('v1', b1.id, JSON.stringify(v1))

  return v1
}

module.exports = {
  handleCollisions,
  resolveCollision,
  computePostCollisionSpeed,
}
