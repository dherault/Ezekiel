// const sphereCollisionDelta = Math.sqrt(3)
const sphereCollisionDelta = 0
const keys4 = ['a', 'b', 'c', 'd']

const emptyVector4 = {}

keys4.forEach(key => emptyVector4[key] = 0)

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

function substractVectors4(v2, v1) {
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

function extractPositionDerivativeVector(b, x) {
  let prefix = ''

  for (let i = 0; i < x; i++) prefix += 'd'

  const vector = {}

  keys4.forEach(key => vector[key] = b[prefix + key])

  return vector
}

function dotProduct4(v1, v2) {
  let dotProduct = 0

  keys4.forEach(key => dotProduct += v1[key] * v2[key])

  return dotProduct
}

module.exports = {
  keys4,
  emptyVector4,
  cantor,
  inverseCantor,
  areSphereCollinding,
  distanceSquare4,
  distance4,
  addVectors4,
  substractVectors4,
  multiplyVector4ByScalar,
  normalizeVector4,
  extractPositionDerivativeVector,
  dotProduct4,
}
