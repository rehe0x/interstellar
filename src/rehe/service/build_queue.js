/* eslint-disable no-unused-vars */
import loadsh from 'lodash'
import moment from 'moment'
import { BusinessError } from '../../lib/error.js'
import { formulas } from '../../game/formula.js'
import { buildingData, researchData, defenseData, fleetData } from '../../game/build/index.js'
import { BuildQueueDao } from '../dao/build_queue.js'
import { PlanetDao } from '../dao/planet.js'
import { workerTimer } from "../../worker/worker_main.js";

class BuildQueueService {
  static async addBuildingQueue (userId, planetId, buildCode) {
    const building = buildingData[buildCode]
    if (!building) {
      throw new BusinessError('建筑&研究不存在' + buildCode)
    }
    const planet =await Planet.findByPk(planetId)
    console.log(planet)
    const queueOne = await BuildQueue.findOneByOrder({
      planetId,
      buildCode
    })

    let level = 0
    let status = 'pending'
    let startTime = null
    if (queueOne) {
      level = queueOne.level
    } else {
      startTime = new Date()
      level = planet[buildCode]
      status = 'running'
    }
    const price = formulas.price(building, level)
    const metal = price.metal
    const crystal = price.crystal
    const deuterium = price.deuterium

    if(metal > planet.metal || crystal > planet.crystal || deuterium > planet.deuterium){
      throw new BusinessError('资源不足' + planet)
    }
    Planet.update({
      metal: planet.metal - metal,
      crystal: planet.crystal - crystal,
      deuterium: planet.deuterium - deuterium
    },{
      where: {
        id: planetId
      }
    })

    level += 1
    const energy = formulas.energy(level).energy
    const seconds = formulas.buildTime({ metal, crystal }, planet)
    const endTime = status === 'running' ? new Date((startTime.getTime() + seconds * 1000)) : null
    const data = {
      userId,
      planetId,
      buildCode,
      buildName: building.name,
      level,
      metal,
      crystal,
      deuterium,
      energy,
      buildType: 'building',
      status,
      seconds,
      startTime,
      endTime,
      updateTime: new Date(),
      createTime: new Date()
    }
    const rest = await BuildQueue.create(data)
    rest.status === 'running' && workerTimer.postMessage(rest.dataValues)
    return rest
  }
}

export { BuildQueueService }
