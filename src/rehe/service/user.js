const userDao = require('../dao/user')
class UserService {
  async add (user) {
    const rest = await userDao.create(user)
    return rest
  }

  async find (user = {}) {
    const rest = await userDao.findAll(user)
    return rest
  }

  async findByItem (user = {}) {
    const rest = await userDao.findAll({
      where: user
    })
    return rest
  }
}

module.exports = new UserService()
