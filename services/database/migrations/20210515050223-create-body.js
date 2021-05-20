module.exports = {
  up: async (queryInterface, Sequelize) => {
    const keys = ['a', 'b', 'c', 'd', 'e']
    const position = {}

    keys.forEach(key => {
      position[key] = { type: Sequelize.FLOAT }
      position[`d${key}`] = { type: Sequelize.FLOAT }
      position[`dd${key}`] = { type: Sequelize.FLOAT }
    })

    await queryInterface.createTable('Bodies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mass: {
        type: Sequelize.FLOAT,
      },
      radius: {
        type: Sequelize.FLOAT,
      },
      ...position,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bodies')
  },
}
