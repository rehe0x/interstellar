
import { GameConfig } from './config.js'
import { UniverseMap } from './universe.map.js'

class Formula {
  static price (obj, level) {
    const metal = Math.floor(obj.pricelist.metal * (obj.pricelist.factor ** level))
    const crystal = Math.floor(obj.pricelist.crystal * (obj.pricelist.factor ** level))
    const deuterium = Math.floor(obj.pricelist.deuterium * (obj.pricelist.factor ** level))
    return { metal, crystal, deuterium }
  }

  static energy (level) {
    const energy = Math.floor((10 * level * (1.1 ** level)) - (10 * (level - 1) * (1.1 ** (level - 1))))
    return { energy }
  }

  static buildTime (obj, planet) {
    let time = (obj.metal + obj.crystal) / GameConfig.GAME_SPEED * (1 / (planet.buildingRobotFactory + 1)) * (0.5 ** planet.buildingNanoFactory)
    time = Math.floor(time * 60 * 60 * (1 - (planet.rpgConstructeur * 0.1)) / UniverseMap[planet.universe].buildSpeed)
    return time
  }

  static researchTime (obj, planet, lablevel) {
    let time = (obj.metal + obj.crystal) / GameConfig.GAME_SPEED / ((lablevel + 1) * 2)
    time = Math.floor(time * 60 * 60 * (1 - (planet.rpgConstructeur * 0.1)) / UniverseMap[planet.universe].buildSpeed)
    return time
  }

  static isRequeriment (obj, planet) {
    let b = true
    for (const key in obj.requeriments) {
      if (!planet[key] || (obj.requeriments[key] > planet[key])) {
        b = false
        break
      }
    }
    return b
  }
}

export {
  Formula
}
