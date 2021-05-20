const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  isProduction,

  developmentPort: 5001,

  appHost: isProduction
    ? 'https://ezekiel.love'
    : 'http://localhost:3000',
}
