import { sequelize } from '../../lib/sequelize.js'
import { UserDao } from '../dao/user.dao.js'
import { PlanetService } from '../service/planet.service.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'

class UserService {
  static async signIn ({ universeId, phone }) {
    return await sequelize.transaction(async (t1) => {
      // 初始化账号
      const uname = genRandom(1, 4) !== 1 ? getRandomChineseWord(2, 12) : getRandomString(5, 18)
      const newUser = await UserService.add({ universeId, phone, username: uname })
      UserSubDao.create({ userId: newUser.id, universeId })
      const newPlanet = await PlanetService.colony(newUser.id, universeId)
      await UserDao.updateUser({ planetId: newPlanet.id }, { id: newUser.id })
      newUser.planetId = newPlanet.id
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
