import dayjs from 'dayjs'
import { sequelize } from '../../lib/sequelize.js'
import { BuildTypeEnum, QueueStatusEnum } from '../../enum/base.enum.js'
import { BusinessError } from '../../lib/error.js'
import { Formula } from '../../game/formula.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'


class ResourcesService {
  static async getUserPlanetSub (userId, planetId) {
    // 查询用户和星球信息
    const userSub = await UserSubDao.findByUser({ userId })
    const planetSub = await PlanetSubDao.findByPlanet({ planetId })
    const planet = await PlanetDao.findByPk(planetId)
    // 验证数据
    if (!userSub || !planetSub || !planet ||
       planetSub.userId !== userSub.userId || planet.id !== planetSub.planetId) {
      throw new BusinessError('数据错误')
    }
    return { userSub, planetSub, planet }
  }

  static async getPlanetResources (userId, planetId) {
    const rest = await this.updatePlanetResources(userId, planetId)
    const planet = await PlanetDao.findByPk(planetId)
    return { ...planet, ...rest }
  }

  // 资源更新
  static async updatePlanetResources (userId, planetId) {
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)
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
    await PlanetDao.updatePlanet(updateDate, { id: planetId })
    return { metalStorageMax, crystalStorageMax, deuteriumStorageMax, metalTime, crystalTime, deuteriumTime }
  }

  // 舰队防御更新
  static async updatePlanetBuild (userId, planetId, buildType) {
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)
   
    if (!buildType) {
      buildType = [BuildTypeEnum.FLEET, BuildTypeEnum.DEFENSE]
    }
    // 查询星球队列信息
    const buildQueueList = await BuildQueueDao.findAllByItem({ planetId, status: QueueStatusEnum.RUNNING, buildType: buildType })
    for (const element of buildQueueList) {
      // 计算间隔时间
      const nowTime = dayjs().valueOf()
      const prodNum = element.seconds / element.level
      const prodTime = Math.floor((nowTime - element.remainUpdateTime) / 1000)
      const n = Math.floor(prodTime / prodNum)
      console.log('nnnnnnnnnnnnnnnnnnnnnnn', n)
      if (n === 0) continue
      await sequelize.transaction(async (t1) => {
        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          remainLevel: element.remainLevel - n,
          remainUpdateTime: nowTime,
          updateTime: dayjs().valueOf()
        }, { id: element.id })
        if (rest[0] === 1) {
          // 修改数量
          await PlanetSubDao.updateIncrementLevel(element.buildCode, planetId,  n)
        }
      })
    }
  }
}

export { ResourcesService }
