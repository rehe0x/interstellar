import loadsh from 'lodash'
import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { remainingTime } from '../../lib/utils.js'
import { GameConfig } from '../../game/config.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap, ResearchMap } from '../../game/build/index.js'

import { sequelize } from '../../lib/sequelize.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'

class ResourcesService {
  // static async getPlanetResources () {
  // }

  // 资源更新
  static async updatePlanetResources (userId, planetId) {
    // 查询用户信息
    const user = {}
    // 查询星球信息
    const planet = await PlanetDao.findByPk(planetId)
    if (!planet) {
      throw new BusinessError('星球不存在')
    }
    // 计算仓库最大容量
    const { metalStorageMax, crystalStorageMax, deuteriumStorageMax } = Formula.storageMax(planet, user)

    // 计算小时产量 && 能量消耗
    const prodPerhour = Formula.prodPerhour(planet, user)

    // 期间生产资源计算
    const nowTime = dayjs().valueOf()
    let metal = planet.metal; let crystal = planet.crystal; let deuterium = planet.deuterium
    let { metalTheorical, crystalTheorical, deuteriumTheorical } = Formula.prodTheorical({ ...prodPerhour, nowTime }, planet)
    if (planet.metal < metalStorageMax) {
      metalTheorical += planet.metal
      metal = (metalTheorical <= metalStorageMax) ? metalTheorical : metalStorageMax
    }
    if (planet.crystal < crystalStorageMax) {
      crystalTheorical += planet.crystal
      crystal = (crystalTheorical <= crystalStorageMax) ? crystalTheorical : crystalStorageMax
    }
    if (planet.deuterium < deuteriumStorageMax) {
      deuteriumTheorical += planet.deuterium
      deuterium = deuteriumTheorical <= deuteriumStorageMax ? deuteriumTheorical : deuteriumStorageMax
    }
    // 更新数据库
    const updateDate = {
      metal,
      crystal,
      deuterium,
      metalPerhour: prodPerhour.metalPerhour,
      crystalPerhour: prodPerhour.crystalPerhour,
      deuteriumPerhour: prodPerhour.deuteriumPerhour,
      energyUsed: prodPerhour.energyUsed,
      energyMax: prodPerhour.energyMax,
      resourcesUpdateTime: nowTime
    }
    PlanetDao.updatePlanet(updateDate, { id: planetId })
  }
}

export { ResourcesService }
