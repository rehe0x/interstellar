import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { sequelize } from '../../lib/sequelize.js'
import { UniverseMap } from '../../game/universe.map.js'
import { genRandom } from '../../lib/utils.js'
import dayjs from 'dayjs'

class PlanetService {
  static async getUserPlanet (userId) {
    const rest = await PlanetDao.findAllByItem({
      userId
    })
    return rest
  }

  static async colony (userId, universeId) {
    return await sequelize.transaction(async (t1) => {
      // 初始化星球
      let newPlannet
      for (let index = 0; index < 10; index++) {
        newPlannet = await PlanetDao.create({
          userId: userId,
          universeId: universeId,
          name: '殖民地' + genRandom(1000, 9999),
          planetType: 'star',
          galaxyX: genRandom(1, 9),
          galaxyY: genRandom(1, 499),
          galaxyZ: genRandom(1, 15),
          tempMini: genRandom(-100, 50),
          tempMax: genRandom(1, 100),
          metal: UniverseMap[universeId].baseMetal,
          crystal: UniverseMap[universeId].baseCristal,
          deuterium: UniverseMap[universeId].baseDeuterium,
          resourcesUpdateTime: dayjs().valueOf(),
          createTime: dayjs().valueOf()
        })
        await PlanetSubDao.create({ planetId: newPlannet.id, userId: userId, universeId: universeId })
      }
      return newPlannet
    })
  }
}

export { PlanetService }
