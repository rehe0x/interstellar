import dayjs from 'dayjs'
import { Formula } from '../../game/formula.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { CommonService } from '../service/common.service.js'

class ResourcesService {
  static async getPlanetResources (userId, planetId) {
    const rest = await this.updatePlanetResources(userId, planetId)
    return rest
  }

  // 资源更新
  static async updatePlanetResources (userId, planetId) {
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)
    // 计算仓库最大容量
    const { metalStorageMax, crystalStorageMax, deuteriumStorageMax } = Formula.storageMax(planetSub, userSub)
    console.log(metalStorageMax, crystalStorageMax, deuteriumStorageMax)
    // 计算小时产量 && 能量消耗
    const prodPerhour = Formula.prodPerhour(planetSub, planet, userSub)
    console.log(prodPerhour)
    // 期间生产资源计算
    const nowTime = dayjs().valueOf()
    let metal = planet.metal; let crystal = planet.crystal; let deuterium = planet.deuterium
    let { metalTheorical, crystalTheorical, deuteriumTheorical, metalTime, crystalTime, deuteriumTime } = Formula.prodTheorical({ ...prodPerhour, nowTime }, planet)
    console.log(metalTheorical, crystalTheorical, deuteriumTheorical)
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
    await PlanetDao.updateTimeResources(updateDate, { planetId })
    return { metal, crystal, deuterium, metalStorageMax, crystalStorageMax, deuteriumStorageMax, metalTime, crystalTime, deuteriumTime }
  }
}

export { ResourcesService }
