const userDao = require('../dao/user')
class UserService {
  async add (user) {
    const rest = await userDao.create(user)
    return rest
  }

  async find (item = {}) {
    const rest = await userDao.findAll(item)
    return rest
  }

  async findOne (item = {}) {
    const rest = await userDao.findOne({
      where: item
    })
    return rest
  }

  async findPage (item = {}) {
    const whereClause = {}
    if (item.username) whereClause.username = item.username
    if (item.password) whereClause.password = item.password
    const rest = await userDao.findAndCountAll({
      where: whereClause,
      limit: item.pageSzie,
      offset: item.pageSzie * (item.pageNum - 1)
    })
    return rest
  }

  async findPageQuery (item = {}) {
    const rest = userDao.findPage()
    return rest
  }
}

module.exports = new UserService()
