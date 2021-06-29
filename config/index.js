const dev = require('./dev')
const pord = require('./pord')

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':return dev
    case 'production':return pord
    default:return dev
  }
}

module.exports = getConfig()
