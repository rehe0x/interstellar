import dayjs from 'dayjs'
import { UniverseMap } from '../../game/universe.map.js'
import { sequelize } from '../../lib/sequelize.js'
import { UserDao } from '../dao/user.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
class UserService {
  static async signIn (param) {
    return await sequelize.transaction(async (t1) => {
      // 初始化账号
      const newUser = await UserService.add({ universeId: param.universeId, phone: param.phone })
      UserSubDao.create({ userId: newUser.id, universeId: param.universeId })
      // 初始化星球
      const newPlannet = await PlanetDao.create({
        userId: newUser.id,
        universeId: param.universeId,
        name: '殖民地',
        planetType: 'star',
        galaxyX: 1,
        galaxyY: 2,
        galaxyZ: 3,
        tempMini: -1,
        tempMax: 55,
        metal: UniverseMap[param.universeId].baseMetal,
        crystal: UniverseMap[param.universeId].baseCristal,
        deuterium: UniverseMap[param.universeId].baseDeuterium,
        resourcesUpdateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      })
      PlanetSubDao.create({ planetId: newPlannet.id, userId: newUser.id, universeId: param.universeId })
      await UserDao.updateUser({ planetId: newPlannet.id }, { id: newUser.id })
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
