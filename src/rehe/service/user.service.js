import { sequelize } from '../../lib/sequelize.js'
import { UserDao } from '../dao/user.dao.js'
import { PlanetService } from '../service/planet.service.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
class UserService {
  static async signIn (param) {
    return await sequelize.transaction(async (t1) => {
      // 初始化账号
      const newUser = await UserService.add({ universeId: param.universeId, phone: param.phone })
      UserSubDao.create({ userId: newUser.id, universeId: param.universeId })
      const newPlannet = await PlanetService.colony(newUser.id, param.universeId)
      await UserDao.updateUser({ planetId: newPlannet.id }, { id: newUser.id })
      newUser.planetId = newPlannet.id
      return newUser
    })
  }

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
