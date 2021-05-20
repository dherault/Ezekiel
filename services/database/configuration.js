const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  isProduction,

  redisHost: isProduction
    ? 'https://redis.ezekiel'
    : 'localhost',

  redisPort: isProduction
    ? 6379
    : 6379,
}
