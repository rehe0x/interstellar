
import { game_config } from './setting.js'
import { universe as universeMap } from './universe.js'

class Formula {
  static price(obj, level){
    const metal = Math.floor(obj.pricelist.metal * (obj.pricelist.factor ** level))
    const crystal = Math.floor(obj.pricelist.crystal * (obj.pricelist.factor ** level))
    const deuterium = Math.floor(obj.pricelist.deuterium * (obj.pricelist.factor ** level))
    return { metal, crystal, deuterium }
  }
  static energy(level){
    const energy = Math.floor((10 * level * (1.1 ** level)) - (10 * (level - 1) * (1.1 ** (level - 1))))
    return { energy }
  }
  static buildTime(obj, planet){
    let time = (obj.metal + obj.crystal) / game_config.game_speed * (1 / (planet.building_robot_factory + 1)) * (0.5 ** planet.building_nano_factory)
    time = Math.floor(time * 60 * 60 * (1 - (planet.rpg_constructeur * 0.1)) / universeMap[planet.universe].build_speed)
    return time
  }
  static researchTime(obj, planet, lablevel){
    let time = (obj.metal + obj.crystal) / game_config.game_speed * ((lablevel + 1) * 2)
    time = Math.floor(time * 60 * 60 * (1 - (planet.rpg_constructeur * 0.1)) / universeMap[planet.universe].build_speed)
    return time
  }
}

export {
  Formula
}
