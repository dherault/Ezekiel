const db = require('../models')

db.sequelize.drop().then(() => {
  process.exit(0)
})
