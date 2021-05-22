const now = new Date()

const keys = ['a', 'b', 'c', 'd', 'e']
const position = {}

keys.forEach(key => {
  position[key] = 0
  position[`d${key}`] = 0
  position[`dd${key}`] = 0
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    // const bodies = get3OnALine()
    // const bodies = get3OnATriangle()
    const bodies = getNAtRandom(64)

    await queryInterface.bulkInsert('Bodies', bodies, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}

function get3OnALine() {
  return [
    {
      mass: 1,
      radius: 28,
      ...position,
      createdAt: now,
      updatedAt: now,
    },
    {
      mass: 1,
      radius: 28,
      ...position,
      b: 28 + 28 + 2,
      createdAt: now,
      updatedAt: now,
    },
    {
      mass: 1,
      radius: 28,
      ...position,
      b: -(28 + 28 + 2),
      createdAt: now,
      updatedAt: now,
    },
  ]
}

function get3OnATriangle() {
  return [
    {
      mass: 1,
      radius: 28,
      ...position,
      createdAt: now,
      updatedAt: now,
    },
    {
      mass: 1,
      radius: 28,
      ...position,
      b: (28 + 28 + 2) * Math.cos(Math.PI / 3),
      c: (28 + 28 + 2) * Math.sin(Math.PI / 3),
      createdAt: now,
      updatedAt: now,
    },
    {
      mass: 1,
      radius: 28,
      ...position,
      b: -(28 + 28 + 2) * Math.cos(Math.PI / 3),
      c: (28 + 28 + 2) * Math.sin(Math.PI / 3),
      createdAt: now,
      updatedAt: now,
    },
  ]
}

function getNAtRandom(n) {
  const bodies = []

  for (let i = 0; i < n; i++) {
    bodies.push({
      mass: Math.random(),
      radius: 16 * Math.random(),
      a: randomFloatInRange(-64, 64),
      b: randomFloatInRange(-64, 64),
      c: randomFloatInRange(-64, 64),
      d: randomFloatInRange(-64, 64),
      da: randomFloatInRange(-4, 4),
      db: randomFloatInRange(-4, 4),
      dc: randomFloatInRange(-4, 4),
      dd: randomFloatInRange(-4, 4),
      dda: randomFloatInRange(-1, 1),
      ddb: randomFloatInRange(-1, 1),
      ddc: randomFloatInRange(-1, 1),
      ddd: randomFloatInRange(-1, 1),
      createdAt: now,
      updatedAt: now,
    },)
  }

  return bodies
}

function randomFloatInRange(a, b) {
  return Math.random() * (b - a) + a
}
