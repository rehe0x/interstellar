import loadsh from "lodash";
import moment from "moment";
import { remainingTime } from "../../lib/utils.js";
import { formulas } from '../../game/formulas.js';
import { buildingData, researchData, defenseData, fleetData } from '../../game/build/index.js';

class BuildQueueService {
  static async getBuildingQueue(){
    const rest = loadsh.cloneDeep(buildingData)
    const level = 30
    const planet = {
      building_robot_factory: 0,
      building_nano_factory: 0,
      universe: 1,
      rpg_constructeur: 0,
    }
   
    for (const key in rest) {
      const obj = rest[key]
      obj.level = level
      obj.metal = formulas.price(obj, level).metal
      obj.crystal = formulas.price(obj, level).crystal
      obj.deuterium = formulas.price(obj, level).deuterium
      obj.build_time = formulas.build_time(obj, planet)
      obj.build_time_show = remainingTime(obj.build_time)
      delete obj.requeriments
      delete obj.pricelist
    }
    return rest
  }
}

export { BuildQueueService }