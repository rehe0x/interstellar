import loadsh from 'lodash'
import { remainingTime } from '../../lib/utils.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap, ResearchMap } from '../../game/build/index.js'

class BuildService {
  static async getBuilding () {
    const rest = loadsh.cloneDeep(BuildingMap)
    const level = 0
    const planet = {
      buildingRobotFactory: 0,
      buildingNanoFactory: 0,
      universe: 1,
      rpgConstructeur: 0
    }

    for (const key in rest) {
      const obj = rest[key]
      obj.level = level
      const price = Formula.price(obj, level)
      obj.metal = price.metal
      obj.crystal = price.crystal
      obj.deuterium = price.deuterium
      obj.buildTime = Formula.buildTime(obj, planet)
      obj.buildTimeShow = remainingTime(obj.buildTime)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }

  static async getResearch () {
    const rest = loadsh.cloneDeep(ResearchMap)
    const level = 3 // 等级 研究所等级 事务官
    const planet = {
      buildingLaboratory: 1,
      researchIntergalacticTech: 1,
      universe: 1,
      rpgConstructeur: 0
    }
    // 获取研究所等级 + 计算跨行星网络 获取所有星球研究所等级
    let lablevel = planet.buildingLaboratory
    if (planet.researchIntergalacticTech >= 1) {
      lablevel += 2
    }

    for (const key in rest) {
      const obj = rest[key]
      obj.metal = Formula.price(obj, level).metal
      obj.crystal = Formula.price(obj, level).crystal
      obj.deuterium = Formula.price(obj, level).deuterium
      obj.buildTime = Formula.researchTime(obj, planet, lablevel)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }
}

export { BuildService }
