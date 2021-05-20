module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    const now = new Date()

    const keys = ['a', 'b', 'c', 'd', 'e']
    const position = {}

    keys.forEach(key => {
      position[key] = 0
      position[`d${key}`] = 0
      position[`dd${key}`] = 0
    })

    await queryInterface.bulkInsert('Bodies', [
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
        b: 32,
        c: 32,
        createdAt: now,
        updatedAt: now,
      },
      {
        mass: 1,
        radius: 28,
        ...position,
        b: -32,
        c: 32,
        createdAt: now,
        updatedAt: now,
      },
      {
        mass: 1,
        radius: 28,
        ...position,
        b: 32,
        c: -32,
        createdAt: now,
        updatedAt: now,
      },
      {
        mass: 1,
        radius: 28,
        ...position,
        b: -32,
        c: -32,
        createdAt: now,
        updatedAt: now,
      },
    ], {})
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
