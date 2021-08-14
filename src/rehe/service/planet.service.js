import { PlanetTypeEnum } from '../../enum/base.enum.js'
import { BusinessError } from '../../lib/error.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { sequelize } from '../../lib/sequelize.js'
import { UniverseMap } from '../../game/universe.map.js'
import { Formula } from '../../game/formula.js'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'
import dayjs from 'dayjs'

class PlanetService {
  static async getUserPlanet (userId) {
    const rest = await PlanetDao.findByUserId({ userId })
    return rest
  }

  static async getPlanetByGalaxy ({ universeId, planetType, galaxyX, galaxyY, galaxyZ }) {
    const rest = await PlanetDao.findByGalaxy({ universeId, planetType, galaxyX, galaxyY, galaxyZ })
    return rest
  }

  static async getStaratlas ({ userId, planetId, galaxyX, galaxyY }) {
    // 查询星球信息
    const planet = await PlanetDao.findById(planetId)
    // 验证数据
    if (!planet || planet.userId !== userId) {
      throw new BusinessError('数据错误')
    }
    const rest = await PlanetDao.findStaratlas({ universeId: planet.universeId, galaxyX, galaxyY })
    return rest
  }

  static async createPlanet ({ userId, universeId, planetType, planetName, galaxyX, galaxyY, galaxyZ }) {
    return await sequelize.transaction(async (t1) => {
      const op = await this.getPlanetByGalaxy({ universeId, planetType, galaxyX, galaxyY, galaxyZ })
      if (op?.length !== 0) {
        return
        // throw new BusinessError('该位置已被殖民')
      }
      const { tempMini, tempMax } = Formula.planetTemp(galaxyZ)
      let sizeMax = 1
      let metal = 0
      let crystal = 0
      let deuterium = 0
      if (planetType === PlanetTypeEnum.STAR) {
        sizeMax = Formula.planetSize(universeId, galaxyZ)
        metal = UniverseMap[universeId].baseMetal
        crystal = UniverseMap[universeId].baseCristal
        deuterium = UniverseMap[universeId].baseDeuterium
      }
      const newPlanet = await PlanetDao.insert({
        userId,
        universeId,
        name: planetName,
        planetType: planetType,
        galaxyX,
        galaxyY,
        galaxyZ,
        tempMini,
        tempMax,
        sizeMax,
        metal,
        crystal,
        deuterium,
        resourcesUpdateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      })
      await PlanetSubDao.insert({ planetId: newPlanet.id, userId: userId, universeId: universeId })
      return newPlanet
    })
  }

  static async colony (userId, universeId, galaxyX, galaxyY, galaxyZ) {
    const planetName = UniverseMap[universeId].basePlanetName
    return await this.createPlanet({ userId, universeId, planetType: PlanetTypeEnum.STAR, planetName, galaxyX, galaxyY, galaxyZ })
  }

  static async generatePlanet (userId, universeId) {
    const planetName = '母星'
    const galaxyX = genRandom(1, 9)
    const galaxyY = genRandom(1, 499)
    const galaxyZ = genRandom(1, 15)
    return await this.createPlanet({ userId, universeId, planetType: PlanetTypeEnum.STAR, planetName, galaxyX, galaxyY, galaxyZ })
  }

  static async generateMoon (userId, universeId, planetId) {
    const planetName = '月球'
    const planet = PlanetDao.findById(planetId)
    if (planet) {
      const { galaxyX, galaxyY, galaxyZ } = planet
      return await this.createPlanet({ userId, universeId, planetType: PlanetTypeEnum.MOON, planetName, galaxyX, galaxyY, galaxyZ })
    }
  }

  static async randomColony (userId, universeId) {
    return await sequelize.transaction(async (t1) => {
      let count = 0
      // 初始化星球
      let newPlanet
      for (let index = 0; index < 100; index++) {
        if (count >= 10) break
        const galaxyX = genRandom(1, 18)
        const galaxyY = genRandom(1, 999)
        const galaxyZ = genRandom(1, 15)
        const planetName = genRandom(1, 4) !== 1 ? getRandomChineseWord(2, 12) : getRandomString(5, 18)
        newPlanet = await this.createPlanet({ userId, universeId, planetType: PlanetTypeEnum.STAR, planetName, galaxyX, galaxyY, galaxyZ })
        if (!newPlanet) {
          continue
        } else {
          count++
        }
        if (genRandom(1, 2) === 1) {
          await this.createPlanet({ userId, universeId, planetType: PlanetTypeEnum.MOON, planetName: '月球', galaxyX, galaxyY, galaxyZ })
        }
      }
      return newPlanet
    })
  }
}

export { PlanetService }
