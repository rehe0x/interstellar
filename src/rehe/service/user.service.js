import { sequelize } from '../../lib/sequelize.js'
import dayjs from 'dayjs'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'
import { UserStatusEnum } from '../../enum/base.enum.js'
import { UserDao } from '../dao/user.dao.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetService } from '../service/planet.service.js'

class UserService {
  static async signIn ({ universeId, phone }) {
    return await sequelize.transaction(async (t1) => {
      // 初始化账号
      const uname = genRandom(1, 4) !== 1 ? getRandomChineseWord(2, 12) : getRandomString(5, 18)
      const newUser = await UserService.addUser({ universeId, phone, username: uname, allianceId: genRandom(1, 15) })
      UserSubDao.insert({ userId: newUser.id, universeId, createTime: dayjs().valueOf() })
      const newPlanet = await PlanetService.generatePlanet({ userId: newUser.id, universeId })
      await UserDao.updateUserPlanetId({ userId: newUser.id, planetId: newPlanet.id, updateTime: dayjs().valueOf() })
      newUser.planetId = newPlanet.id
      PlanetService.randomColony({ userId: newUser.id, universeId })
      return newUser
    })
  }

  static async addUser ({ universeId, allianceId, username, phone }) {
    const rest = await UserDao.insert({ universeId, allianceId, username, phone, status: UserStatusEnum.PROTECTED, enabled: true, createTime: dayjs().valueOf() })
    return rest
  }

  static async findOneByUPhone ({ universeId, phone }) {
    const rest = await UserDao.findOneByUPhone({ universeId, phone })
    return rest
  }

  static async updateUserPlanetId ({ userId, planetId }) {
    const rest = await UserDao.updateUserPlanetId({ userId, planetId, updateTime: dayjs().valueOf() })
    return rest
  }

  static async updatePoints ({ metal, crystal, deuterium, userId }) {
    const points = ~~((metal + crystal + deuterium) / 1000)
    const rest = await UserDao.updateIncrementPoints({ userId, points, updateTime: dayjs().valueOf() })
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
