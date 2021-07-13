import loadsh from "lodash";
import { formulas } from '../../game/formulas.js';
import { buildingData, researchData, defenseData, fleetData } from '../../game/build/index.js';

class BuildService {
  static async getBuilding(){
    const rest = loadsh.cloneDeep(buildingData)
    const level = 3 //等级 机器人等级 纳米机器人等级 事务官
    const planet = {
      building_robot_factory: 11,
      building_nano_factory: 3,
      universe: 1,
      rpg_constructeur: 0,
    }
   
    for (const key in rest) {
      const obj = rest[key]
      obj.metal = formulas.price(obj, level).metal
      obj.crystal = formulas.price(obj, level).crystal
      obj.deuterium = formulas.price(obj, level).deuterium
      obj.build_time = formulas.build_time(obj, planet)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }

  static async getResearch(){
    const rest = loadsh.cloneDeep(researchData)
    const level = 3 //等级 研究所等级 事务官
    const planet = {
      building_laboratory: 1,
      research_intergalactic_tech: 1,
      universe: 1,
      rpg_constructeur: 0,
    }
    // 获取研究所等级 + 计算跨行星网络 获取所有星球研究所等级
    let lablevel = planet.building_laboratory
    if (planet.research_intergalactic_tech >= 1) {
      lablevel += 2
    }
  
    for (const key in rest) {
      const obj = rest[key]
      obj.metal = formulas.price(obj, level).metal
      obj.crystal = formulas.price(obj, level).crystal
      obj.deuterium = formulas.price(obj, level).deuterium
      obj.build_time = formulas.research_time(obj, planet, lablevel)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }
}

export { BuildService }