import { PlanetTypeEnum } from '../../enum/base.enum.js'
import { BusinessError } from '../../lib/error.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { sequelize } from '../../lib/sequelize.js'
import { UniverseMap } from '../../game/universe.map.js'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'
import dayjs from 'dayjs'

class PlanetService {
  static async getUserPlanet (userId) {
    const rest = await PlanetDao.findAllByItem({
      userId
    })
    return rest
  }

  static async getPlanetByGalaxy ({ universeId, planetType, galaxyX, galaxyY, galaxyZ }) {
    const whereClause = {
      universeId,
      galaxyX,
      galaxyY,
      galaxyZ
    }
    if (planetType) whereClause.planetType = planetType
    const rest = await PlanetDao.findAllByItem(whereClause)
    return rest
  }

  static async getStaratlas ({ userId, planetId, galaxyX, galaxyY }) {
    // 查询星球信息
    const planet = await PlanetDao.findByPk(planetId)
    // 验证数据
    if (!planet || planet.userId !== userId) {
      throw new BusinessError('数据错误')
    }
    const whereClause = {
      universeId: planet.universeId,
      galaxyX,
      galaxyY
    }
    const rest = await PlanetDao.getStaratlas(whereClause)
    return rest
  }

  static async colony (userId, universeId) {
    return await sequelize.transaction(async (t1) => {
      let count = 0
      // 初始化星球
      let newPlanet
      for (let index = 0; index < 100; index++) {
        if (count >= 10) break
        const galaxyX = genRandom(1, 18)
        const galaxyY = genRandom(1, 999)
        const galaxyZ = genRandom(1, 15)
        const op = await this.getPlanetByGalaxy({ universeId, star: PlanetTypeEnum.STAR, galaxyX, galaxyY, galaxyZ })
        if (op.length !== 0) {
          continue
        } else {
          count++
        }
        const pname = genRandom(1, 4) !== 1 ? getRandomChineseWord(2, 12) : getRandomString(5, 18)
        const sizeMax = genRandom(180, 350)
        newPlanet = await PlanetDao.create({
          userId: userId,
          universeId: universeId,
          name: pname,
          planetType: PlanetTypeEnum.STAR,
          galaxyX,
          galaxyY,
          galaxyZ,
          tempMini: genRandom(-100, 50),
          tempMax: genRandom(1, 100),
          sizeMax,
          sizeUsed: sizeMax,
          metal: UniverseMap[universeId].baseMetal,
          crystal: UniverseMap[universeId].baseCristal,
          deuterium: UniverseMap[universeId].baseDeuterium,
          resourcesUpdateTime: dayjs().valueOf(),
          createTime: dayjs().valueOf()
        })
        await PlanetSubDao.create({ planetId: newPlanet.id, userId: userId, universeId: universeId })
        if (genRandom(1, 2) === 1) {
          const moon = await PlanetDao.create({
            userId: userId,
            universeId: universeId,
            name: pname,
            planetType: PlanetTypeEnum.MOON,
            galaxyX,
            galaxyY,
            galaxyZ,
            tempMini: genRandom(-100, 50),
            tempMax: genRandom(1, 100),
            sizeMax,
            sizeUsed: sizeMax,
            metal: UniverseMap[universeId].baseMetal,
            crystal: UniverseMap[universeId].baseCristal,
            deuterium: UniverseMap[universeId].baseDeuterium,
            resourcesUpdateTime: dayjs().valueOf(),
            createTime: dayjs().valueOf()
          })
          await PlanetSubDao.create({ planetId: moon.id, userId: userId, universeId: universeId })
        }
      }
      return newPlanet
    })
  }
}

export { PlanetService }
