import { PlanetTypeEnum, PlanetLabelEnum } from '../../enum/base.enum.js'
import { BusinessError } from '../../lib/error.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { sequelize } from '../../lib/sequelize.js'
import { UniverseMap } from '../../game/universe.map.js'
import { Formula } from '../../game/formula.js'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'
import dayjs from 'dayjs'

class PlanetService {
  static async getUserPlanetList (userId) {
    const rest = await PlanetDao.findByUserId({ userId })
    const starArray = rest.filter(item => item.planetType === PlanetTypeEnum.STAR).sort((a, b) => a.createTime - b.createTime)
    const moonArray = rest.filter(item => item.planetType === PlanetTypeEnum.MOON)
    for (let index = starArray.length - 1; index >= 0; index--) {
      const star = starArray[index]
      const moon = moonArray.find((m) => (m.galaxyX === star.galaxyX && m.galaxyY === star.galaxyY && m.galaxyZ === star.galaxyZ))
      moon && starArray.splice(index + 1, 0, moon)
    }
    return starArray
  }

  static async getUserPlanetInfo ({ userId, planetId }) {
    return await PlanetDao.findByUserPlanetId({ userId, planetId })
  }

  static async getUserPlanetSubByType ({ userId, planetType }) {
    const rest = await PlanetSubDao.findByUserId({ userId, planetType })
    return rest.sort((a, b) => b.buildingLaboratory - a.buildingLaboratory)
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

  static async createPlanet ({ userId, universeId, planetName, planetType, label, galaxyX, galaxyY, galaxyZ }) {
    return await sequelize.transaction(async (t1) => {
      const op = await this.getPlanetByGalaxy({ universeId, planetType, galaxyX, galaxyY, galaxyZ })
      if (op?.length !== 0) {
        return
        // throw new BusinessError('该位置已被殖民')
      }
      const { tempMini, tempMax } = Formula.planetTemp(galaxyZ)
      let sizeMax = 1
      let diameter = genRandom(100, 200) * 75
      const metal = UniverseMap[universeId].baseMetal
      const crystal = UniverseMap[universeId].baseCristal
      const deuterium = UniverseMap[universeId].baseDeuterium
      if (planetType === PlanetTypeEnum.STAR) {
        sizeMax = Formula.planetSize(universeId, galaxyZ)
        diameter = sizeMax * 75
      }
      const nowTime = dayjs().valueOf()
      const newPlanet = await PlanetDao.insert({
        userId,
        universeId,
        name: planetName,
        planetType,
        label,
        galaxyX,
        galaxyY,
        galaxyZ,
        tempMini,
        tempMax,
        sizeMax,
        diameter,
        metal,
        crystal,
        deuterium,
        resourcesUpdateTime: nowTime,
        createTime: nowTime
      })
      await PlanetSubDao.insert({ planetId: newPlanet.id, userId: userId, universeId: universeId, planetType, createTime: nowTime })
      return newPlanet
    })
  }

  static async colony ({ userId, universeId, galaxyX, galaxyY, galaxyZ }) {
    const planetName = UniverseMap[universeId].basePlanetName
    return await this.createPlanet({ userId, universeId, planetName, planetType: PlanetTypeEnum.STAR, label: PlanetLabelEnum.STARCOLONY, galaxyX, galaxyY, galaxyZ })
  }

  static async generatePlanet ({ userId, universeId }) {
    let rest = null
    for (let index = 0; index < 100; index++) {
      const planetName = '母星'
      const galaxyX = genRandom(1, 9)
      const galaxyY = genRandom(1, 499)
      const galaxyZ = genRandom(1, 15)
      rest = await this.createPlanet({ userId, universeId, planetName, planetType: PlanetTypeEnum.STAR, label: PlanetLabelEnum.STARBASE, galaxyX, galaxyY, galaxyZ })
      if (rest) break
    }
    if (!rest) {
      throw new BusinessError('初始化失败')
    }
    return rest
  }

  static async generateMoon ({ userId, universeId, planetId }) {
    const planetName = '月球'
    const planet = PlanetDao.findById(planetId)
    if (planet) {
      const { galaxyX, galaxyY, galaxyZ } = planet
      return await this.createPlanet({ userId, universeId, planetName, planetType: PlanetTypeEnum.MOON, label: PlanetLabelEnum.STARCOLONY, galaxyX, galaxyY, galaxyZ })
    }
  }

  static async randomColony ({ userId, universeId }) {
    return await sequelize.transaction(async (t1) => {
      let count = 0
      for (let index = 0; index < 100; index++) {
        if (count >= 10) break
        const galaxyX = genRandom(1, 18)
        const galaxyY = genRandom(1, 999)
        const galaxyZ = genRandom(1, 15)
        const planetName = genRandom(1, 4) !== 1 ? getRandomChineseWord(2, 12) : getRandomString(5, 18)
        const newPlanet = await this.createPlanet({ userId, universeId, planetName, planetType: PlanetTypeEnum.STAR, label: PlanetLabelEnum.STARCOLONY, galaxyX, galaxyY, galaxyZ })
        if (!newPlanet) {
          continue
        } else {
          count++
        }
        if (genRandom(1, 2) === 1) {
          await this.createPlanet({ userId, universeId, planetName: '月球', planetType: PlanetTypeEnum.MOON, label: PlanetLabelEnum.STARCOLONY, galaxyX, galaxyY, galaxyZ })
        }
      }
    })
  }
}

export { PlanetService }
