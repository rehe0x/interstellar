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
      const newUser = await UserService.addUser({ universeId, phone, username: uname, allianceId: genRandom(1, 15) })
      UserSubDao.insert({ userId: newUser.id, universeId })
      const newPlanet = await PlanetService.colony(newUser.id, universeId)
      await UserDao.updateUserPlanetId(newPlanet.id, newUser.id)
      newUser.planetId = newPlanet.id
      return newUser
    })
  }

  static async addUser ({ universeId, phone, username, allianceId }) {
    const rest = await UserDao.insert({ universeId, phone, username, allianceId })
    return rest
  }

  static async findOneByUPhone ({ universeId, phone }) {
    const rest = await UserDao.findOneByUPhone({ universeId, phone })
    return rest
  }

  static async findItemPage ({ username, password, pageSzie = 10, pageNum = 0 }) {
    const whereClause = {}
    if (username) whereClause.username = username
    if (password) whereClause.password = password
    const rest = await UserDao.findAndCountAll({
      where: whereClause,
      limit: pageSzie,
      offset: pageSzie * (pageNum - 1)
    })
    return rest
  }
}

export { UserService }
