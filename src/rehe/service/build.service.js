import loadsh from 'lodash'
import { BusinessError } from '../../lib/error.js'
import { remainingTime } from '../../lib/utils.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap, ResearchMap } from '../../game/build/index.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'

class BuildService {
  static async getBuilding (userId, planetId) {
    const rest = loadsh.cloneDeep(BuildingMap)
    // 查询用户和星球信息
    const userSub = await UserSubDao.findByUser({ userId })
    const planetSub = await PlanetSubDao.findByPlanet({ planetId })
    // 验证数据
    if (planetSub.userId !== userSub.userId) {
      throw new BusinessError('数据错误')
    }
    for (const key in rest) {
      const obj = rest[key]
      const { metal, crystal, deuterium } = Formula.price(obj, planetSub[key])
      obj.metal = metal
      obj.crystal = crystal
      obj.deuterium = deuterium
      obj.level = planetSub[key]
      obj.buildTime = Formula.buildingTime(obj, planetSub, userSub)
      obj.buildTimeShow = remainingTime(obj.buildTime)
      obj.requeriment = Formula.isRequeriment(obj, planetSub, userSub)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }

  static async getResearch (userId, planetId) {
    const rest = loadsh.cloneDeep(ResearchMap)
    // 查询用户和星球信息
    const userSub = await UserSubDao.findByUser({ userId })
    const planetSub = await PlanetSubDao.findByPlanet({ planetId })
    // 验证数据
    if (planetSub.userId !== userSub.userId) {
      throw new BusinessError('数据错误')
    }
    // 获取研究所等级 + 计算跨行星网络 获取所有星球研究所等级
    let lablevel = planetSub.buildingLaboratory
    if (userSub.researchIntergalactic >= 1) {
      lablevel += 2
    }

    for (const key in rest) {
      const obj = rest[key]
      const { metal, crystal, deuterium } = Formula.price(obj, userSub[key])
      obj.metal = metal
      obj.crystal = crystal
      obj.deuterium = deuterium
      obj.level = userSub[key]
      obj.buildTime = Formula.researchTime(obj, userSub, lablevel)
      obj.buildTimeShow = remainingTime(obj.buildTime)
      obj.requeriment = Formula.isRequeriment(obj, planetSub, userSub)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }
}

export { BuildService }
