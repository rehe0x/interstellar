import loadsh from 'lodash'
import { remainingTime } from '../../lib/utils.js'
import { Formula } from '../../game/formula.js'
import { PlanetTypeEnum } from '../../enum/base.enum.js'
import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { CommonService } from '../service/common.service.js'
import { PlanetService } from '../service/planet.service.js'
class BuildService {
  static async getBuilding (userId, planetId) {
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)
    let rest = {}
    if (PlanetTypeEnum.STAR === planet.planetType) {
      rest = loadsh.cloneDeep(BuildingMap)
    } else if (PlanetTypeEnum.MOON === planet.planetType) {
      rest = loadsh.cloneDeep(BuildingMoonMap)
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
    const { userSub, planetSub } = await CommonService.getUserPlanetSub(userId, planetId)

    // 获取研究所等级 + 计算跨行星网络 获取所有星球研究所等级
    let planetSubListFilter = null
    if (userSub.researchIntergalactic >= 1) {
      const planetSubList = await PlanetService.getUserPlanetSubByType({ userId, planetType: PlanetTypeEnum.STAR })
      planetSubListFilter = planetSubList.filter(item => item.planetId !== planetId && item.buildingLaboratory > 0)
    }
    for (const key in rest) {
      const obj = rest[key]
      const { metal, crystal, deuterium } = Formula.price(obj, userSub[key])
      obj.metal = metal
      obj.crystal = crystal
      obj.deuterium = deuterium
      obj.level = userSub[key]
      obj.requeriment = Formula.isRequeriment(obj, planetSub, userSub)
      let lablevel = planetSub.buildingLaboratory
      if (planetSubListFilter && obj.requeriment.isReq) {
        for (let index = 0; index < userSub.researchIntergalactic; index++) {
          const sub = planetSubListFilter[index]
          if (!sub) break
          if (obj.requeriments.buildingLaboratory) {
            sub.buildingLaboratory >= obj.requeriments.buildingLaboratory && (lablevel += sub.buildingLaboratory)
          } else {
            lablevel += sub.buildingLaboratory
          }
        }
      }
      obj.buildTime = Formula.researchTime(obj, userSub, lablevel)
      obj.buildTimeShow = remainingTime(obj.buildTime)

      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }

  static async getFleet (userId, planetId) {
    const rest = loadsh.cloneDeep(FleetMap)
    const { userSub, planetSub } = await CommonService.getUserPlanetSub(userId, planetId)
    for (const key in rest) {
      const obj = rest[key]
      obj.metal = obj.pricelist.metal
      obj.crystal = obj.pricelist.crystal
      obj.deuterium = obj.pricelist.deuterium

      obj.level = planetSub[key]
      obj.originLevel = planetSub[key]
      const seconds = Formula.fleetDefenseTime({ metal: obj.pricelist.metal, crystal: obj.pricelist.crystal }, planetSub, userSub)
      obj.buildTime = seconds
      obj.buildTimeShow = remainingTime(seconds)
      obj.requeriment = Formula.isRequeriment(obj, planetSub, userSub)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }

  static async getDefense (userId, planetId) {
    const rest = loadsh.cloneDeep(DefenseMap)
    const { userSub, planetSub } = await CommonService.getUserPlanetSub(userId, planetId)
    for (const key in rest) {
      const obj = rest[key]
      obj.metal = obj.pricelist.metal
      obj.crystal = obj.pricelist.crystal
      obj.deuterium = obj.pricelist.deuterium

      obj.level = planetSub[key]
      const seconds = Formula.fleetDefenseTime({ metal: obj.pricelist.metal, crystal: obj.pricelist.crystal }, planetSub, userSub)
      obj.buildTime = seconds
      obj.buildTimeShow = remainingTime(seconds)
      obj.requeriment = Formula.isRequeriment(obj, planetSub, userSub)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }
}

export { BuildService }
