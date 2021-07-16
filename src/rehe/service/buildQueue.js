/* eslint-disable no-unused-vars */
import loadsh from 'lodash'
import moment from 'moment'
import { BusinessError } from '../../lib/error.js'
import { remainingTime } from '../../lib/utils.js'
import { formulas } from '../../game/formulas.js'
import { buildingData, researchData, defenseData, fleetData } from '../../game/build/index.js'
import { BuildQueue } from '../dao/buildQueue.js'

class BuildQueueService {
  static async addBuildingQueue (userId, planetId, buildCode) {
    const building = buildingData[buildCode]
    if (!building) {
      throw new BusinessError('建筑不存在' + buildCode)
    }
    const planet = {
      building_robot_factory: 0,
      building_nano_factory: 0,
      universe: 1,
      rpg_constructeur: 0,
      building_metal_mine: 0
    }

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
    level += 1
    const energy = formulas.energy(level).energy
    const seconds = formulas.buildTime({ metal, crystal }, planet)
    const endTime = startTime ? new Date((startTime.getTime() + seconds * 1000)) : null
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
      createTime: new Date()
    }
    return BuildQueue.create(data)
  }
}

export { BuildQueueService }
