import { UserDao } from '../dao/user.js'
class UserService {
  static async add (user) {
    const rest = await UserDao.create(user)
    return rest
  }

  static async find (item = {}) {
    const rest = await UserDao.findAll(item)
    return rest
  }

  static async findOne (item = {}) {
    const rest = await UserDao.findOne({
      where: item
    })
    return rest
  }

  static async findPage (item = {}) {
    const whereClause = {}
    if (item.username) whereClause.username = item.username
    if (item.password) whereClause.password = item.password
    const rest = await UserDao.findAndCountAll({
      where: whereClause,
      limit: item.pageSzie,
      offset: item.pageSzie * (item.pageNum - 1)
    })
    return rest
  }

  static async findPageQuery (item = {}) {
    const rest = UserDao.findPage()
    return rest
  }
}

export { UserService }
