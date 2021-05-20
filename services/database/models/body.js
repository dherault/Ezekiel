const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Body extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Body }) {
      // define association here
      Body.hasMany(Body, { foreignKey: 'parentId' })
      Body.belongsTo(Body, { foreignKey: 'parentId' })
    }
  }

  const keys = ['a', 'b', 'c', 'd', 'e']
  const position = {}

  keys.forEach(key => {
    position[key] = DataTypes.FLOAT
    position[`d${key}`] = DataTypes.FLOAT
    position[`dd${key}`] = DataTypes.FLOAT
  })

  Body.init({
    mass: DataTypes.FLOAT,
    radius: DataTypes.FLOAT,
    ...position,
  }, {
    sequelize,
    modelName: 'Body',
  })

  return Body
}
