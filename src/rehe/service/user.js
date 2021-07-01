const userDao = require('../dao/user')

exports.test = async () => {
  const rest = await userDao.test()
  return rest
}

exports.add = async () => {
  const rest = await userDao.add()
  return rest
}
