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
    const userSub = await UserSubDao.findByUserId(userId)
    const planetSub = await PlanetSubDao.findByPlanetId(planetId)
    const planet = await PlanetDao.findById(planetId)
    // 验证数据
    if (!userSub || !planetSub || !planet ||
       planetSub.userId !== userSub.userId || planet.id !== planetSub.planetId) {
      throw new BusinessError('数据错误')
    }
    return { userSub, planetSub, planet }
  }

  static async getPlanetResources (userId, planetId) {
    const rest = await this.updatePlanetResources(userId, planetId)
    const planet = await PlanetDao.findById(planetId)
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
    await PlanetDao.updateTimeResources(updateDate, { planetId })
    return { metalStorageMax, crystalStorageMax, deuteriumStorageMax, metalTime, crystalTime, deuteriumTime }
  }

  // 舰队防御更新
  static async updatePlanetBuild (userId, planetId, buildType) {
    if (!buildType) {
      buildType = [BuildTypeEnum.FLEET, BuildTypeEnum.DEFENSE]
    }
    // 查询星球队列信息
    const buildQueueList = await BuildQueueDao.findPlanetByTypeStatus({ userId, planetId, buildType: buildType, status: QueueStatusEnum.RUNNING })
    for (const buildQueue of buildQueueList) {
      // 计算间隔时间
      const nowTime = dayjs().valueOf()
      const prodNum = buildQueue.seconds / buildQueue.level
      const prodTime = Math.floor((nowTime - buildQueue.remainUpdateTime) / 1000)
      let n = Math.floor(prodTime / prodNum)
      if (!n || n === 0) continue
      await sequelize.transaction(async (t1) => {
        // 修改为执行队列
        n > buildQueue.remainLevel && (n = buildQueue.remainLevel)
        const rest = await BuildQueueDao.updateRemain({
          remainLevel: buildQueue.remainLevel - n,
          remainUpdateTime: buildQueue.remainUpdateTime + (n * prodNum * 1000),
          updateTime: dayjs().valueOf()
        }, { queueId: buildQueue.id })
        if (rest[0] === 1) {
          // 修改数量
          await PlanetSubDao.updateIncrementLevel({ planetId, code: buildQueue.buildCode, level: n })
        }
      })
    }
  }
}

export { ResourcesService }
