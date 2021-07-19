import { BusinessError } from '../../lib/error.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap } from '../../game/build/index.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { workerTimer } from '../../worker/worker_main.js'

class BuildQueueService {
  static async addBuildingQueue (userId, planetId, buildCode) {
    const building = BuildingMap[buildCode]
    if (!building) {
      throw new BusinessError('建筑&研究不存在' + buildCode)
    }
    const planet = await PlanetDao.findByPk(planetId)
    console.log(planet)
    const queueOne = await BuildQueueDao.findOneByOrder({
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
    const price = Formula.price(building, level)
    const metal = price.metal
    const crystal = price.crystal
    const deuterium = price.deuterium

    if (metal > planet.metal || crystal > planet.crystal || deuterium > planet.deuterium) {
      throw new BusinessError('资源不足' + planet)
    }
    PlanetDao.update({
      metal: planet.metal - metal,
      crystal: planet.crystal - crystal,
      deuterium: planet.deuterium - deuterium
    }, {
      where: {
        id: planetId
      }
    })

    level += 1
    const energy = Formula.energy(level).energy
    const seconds = Formula.buildTime({ metal, crystal }, planet)
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
    const rest = await BuildQueueDao.create(data)
    rest.status === 'running' && workerTimer.postMessage(rest.dataValues)
    return rest
  }
}

export { BuildQueueService }
