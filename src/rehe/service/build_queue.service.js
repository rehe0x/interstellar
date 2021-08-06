import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { sequelize } from '../../lib/sequelize.js'
import { BuildTypeEnum, QueueStatusEnum } from '../../enum/base.enum.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { workerTimer } from '../../worker/worker_main.js'

class BuildQueueService {
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

  static async addBuildingQueue (userId, planetId, buildCode) {
    return await sequelize.transaction(async (t1) => {
      // 查询建筑信息
      const building = BuildingMap[buildCode]
      if (!building) {
        throw new BusinessError('建筑不存在')
      }
      // 查询用户和星球信息
      const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)

      const requeriment = Formula.isRequeriment(building, planetSub, userSub)
      if (!requeriment.isReq) {
        throw new BusinessError(JSON.stringify(requeriment.requeriments))
      }
      // 查询星球队列信息
      const buildQueueList = await BuildQueueDao.findAllByItem({ planetId, buildType: BuildTypeEnum.BUILDING })
      const isQueue = buildQueueList.length !== 0
      const buildQueueOne = buildQueueList.filter(item => item.buildCode === buildCode).sort((a, b) => b.level - a.level)[0]

      let level = !buildQueueOne ? planetSub[buildCode] : buildQueueOne.level
      let status = QueueStatusEnum.PENDING
      let startTime = null
      let endTime = null
      // 查询造价
      const price = Formula.price(building, level)
      const metal = price.metal
      const crystal = price.crystal
      const deuterium = price.deuterium
      // 计算建造时间 s
      const seconds = Formula.buildingTime({ metal, crystal }, planetSub, userSub)
      // 如果没有队列
      if (!isQueue) {
        if (metal > planet.metal || crystal > planet.crystal || deuterium > planet.deuterium) {
          throw new BusinessError('资源不足' + planet)
        }
        // 扣减资源
        PlanetDao.updatePlanet({ metal: planet.metal - metal, crystal: planet.crystal - crystal, deuterium: planet.deuterium - deuterium }, { id: planetId })
        status = QueueStatusEnum.RUNNING
        const day = dayjs()
        startTime = day.valueOf()
        endTime = day.add(seconds, 'seconds').valueOf()
      }

      // 计算能量 && 封装入库数据
      level += 1
      const energy = Formula.energy(level).energy
      const buildingQueueData = {
        userId,
        planetId,
        buildCode,
        buildName: building.name,
        level,
        metal,
        crystal,
        deuterium,
        energy,
        buildType: BuildTypeEnum.BUILDING,
        status,
        seconds,
        startTime,
        endTime,
        updateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      }
      // 加入数据库
      const rest = await BuildQueueDao.create(buildingQueueData)
      // 加入定时任务
      rest.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: BuildTypeEnum.BUILDING, taskInfo: rest.dataValues })
      return rest
    })
  }

  static async addResearchQueue (userId, planetId, buildCode) {
    // 查询建筑信息
    const research = ResearchMap[buildCode]
    if (!research) {
      throw new BusinessError('研究不存在')
    }
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)

    const requeriment = Formula.isRequeriment(research, planetSub, userSub)
    if (!requeriment.isReq) {
      throw new BusinessError(JSON.stringify(requeriment.requeriments))
    }
    // 查询星球队列信息 等级降序查询 取一个
    const buildQueueOne = await BuildQueueDao.findOneByItem({ userId, buildType: BuildTypeEnum.RESEARCH })
    // 如果没有队列
    if (!buildQueueOne) {
      let level = userSub[buildCode]
      // 查询造价
      const price = Formula.price(research, level)
      const metal = price.metal
      const crystal = price.crystal
      const deuterium = price.deuterium

      // 计算建造时间 获取研究所等级 + 计算跨行星网络 获取所有星球研究所等级
      let lablevel = planetSub.buildingLaboratory
      if (userSub.researchIntergalactic >= 1) {
        lablevel += 0
      }
      const seconds = Formula.researchTime({ metal, crystal }, userSub, lablevel)
      const status = QueueStatusEnum.RUNNING

      const day = dayjs()
      const startTime = day.valueOf()
      const endTime = day.add(seconds, 'seconds').valueOf()
      level += 1
      const energy = 0
      if (metal > planet.metal || crystal > planet.crystal || deuterium > planet.deuterium) {
        throw new BusinessError('资源不足' + planet)
      }
      const newQueue = await sequelize.transaction(async (t1) => {
        // 扣减资源
        PlanetDao.updatePlanet({ metal: planet.metal - metal, crystal: planet.crystal - crystal, deuterium: planet.deuterium - deuterium }, { id: planetId })
        const buildingQueueData = {
          userId,
          planetId,
          buildCode,
          buildName: research.name,
          level,
          metal,
          crystal,
          deuterium,
          energy,
          buildType: BuildTypeEnum.RESEARCH,
          status,
          seconds,
          startTime,
          endTime,
          updateTime: dayjs().valueOf(),
          createTime: dayjs().valueOf()
        }
        // 加入数据库
        const rest = await BuildQueueDao.create(buildingQueueData)
        return rest
      })
      // 加入定时任务
      newQueue.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: BuildTypeEnum.RESEARCH, taskInfo: newQueue.dataValues })
      return newQueue
    } else {
      throw new BusinessError('还有研究未完成')
    }
  }

  static async addFleetQueue (userId, planetId, buildCode, num) {
    // 查询建筑信息
    const fleet = FleetMap[buildCode]
    if (!fleet) {
      throw new BusinessError('舰队不存在')
    }
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)

    const requeriment = Formula.isRequeriment(fleet, planetSub, userSub)
    if (!requeriment.isReq) {
      throw new BusinessError(JSON.stringify(requeriment.requeriments))
    }
    // 查询星球队列信息
    const buildQueueList = await BuildQueueDao.findAllByItem({ planetId, buildType: BuildTypeEnum.FLEET })
    const isQueue = buildQueueList.length !== 0
    // 计算造价，资源不足 按最小数量生产
    if (fleet.pricelist.metal * num > planet.metal) {
      num = (planet.metal / fleet.pricelist.metal) < 1 ? 0 : Math.floor(planet.metal / fleet.pricelist.metal)
    }
    if (fleet.pricelist.crystal * num > planet.crystal) {
      const crystalNum = (planet.crystal / fleet.pricelist.crystal) < 1 ? 0 : Math.floor(planet.crystal / fleet.pricelist.crystal)
      crystalNum < num && (num = crystalNum)
    }
    if (fleet.pricelist.deuterium * num > planet.deuterium) {
      const deuteriumNum = (planet.deuterium / fleet.pricelist.deuterium) < 1 ? 0 : Math.floor(planet.deuterium / fleet.pricelist.deuterium)
      deuteriumNum < num && (num = deuteriumNum)
    }
    if (num <= 0) {
      return
    }
    const metal = fleet.pricelist.metal * num
    const crystal = fleet.pricelist.crystal * num
    const deuterium = fleet.pricelist.deuterium * num
    const level = num
    const remainLevel = num
    let status = QueueStatusEnum.PENDING
    let startTime = null
    let endTime = null
    // 计算建造时间 s
    let seconds = Formula.fleetDefenseTime({ metal: fleet.pricelist.metal, crystal: fleet.pricelist.crystal }, planetSub, userSub)
    seconds = seconds * num
    // 如果没有队列
    if (!isQueue) {
      status = QueueStatusEnum.RUNNING
      const day = dayjs()
      startTime = day.valueOf()
      endTime = day.add(seconds, 'seconds').valueOf()
    }
    const newQueue = await sequelize.transaction(async (t1) => {
      // 扣减资源
      PlanetDao.updatePlanet({ metal: planet.metal - metal, crystal: planet.crystal - crystal, deuterium: planet.deuterium - deuterium }, { id: planetId })
      const buildingQueueData = {
        userId,
        planetId,
        buildCode,
        buildName: fleet.name,
        level,
        remainLevel,
        metal,
        crystal,
        deuterium,
        energy: 0,
        buildType: BuildTypeEnum.FLEET,
        status,
        seconds,
        startTime,
        endTime,
        updateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      }
      // 加入数据库
      const rest = await BuildQueueDao.create(buildingQueueData)
      return rest
    })
    // 加入定时任务
    newQueue.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: BuildTypeEnum.FLEET, taskInfo: newQueue.dataValues })
    return newQueue
  }

  static async addDefenseQueue (userId, planetId, buildCode, num) {
    // 查询建筑信息
    const defense = DefenseMap[buildCode]
    if (!defense) {
      throw new BusinessError('防御不存在')
    }
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await this.getUserPlanetSub(userId, planetId)

    const requeriment = Formula.isRequeriment(defense, planetSub, userSub)
    if (!requeriment.isReq) {
      throw new BusinessError(JSON.stringify(requeriment.requeriments))
    }
    // 查询星球队列信息
    const buildQueueList = await BuildQueueDao.findAllByItem({ planetId, buildType: BuildTypeEnum.DELETE })
    const isQueue = buildQueueList.length !== 0
    // 计算造价，资源不足 按最小数量生产
    if (defense.pricelist.metal * num > planet.metal) {
      num = (planet.metal / defense.pricelist.metal) < 1 ? 0 : Math.floor(planet.metal / defense.pricelist.metal)
    }
    if (defense.pricelist.crystal * num > planet.crystal) {
      const crystalNum = (planet.crystal / defense.pricelist.crystal) < 1 ? 0 : Math.floor(planet.crystal / defense.pricelist.crystal)
      crystalNum < num && (num = crystalNum)
    }
    if (defense.pricelist.deuterium * num > planet.deuterium) {
      const deuteriumNum = (planet.deuterium / defense.pricelist.deuterium) < 1 ? 0 : Math.floor(planet.deuterium / defense.pricelist.deuterium)
      deuteriumNum < num && (num = deuteriumNum)
    }
    if (num <= 0) {
      return
    }
    const metal = defense.pricelist.metal * num
    const crystal = defense.pricelist.crystal * num
    const deuterium = defense.pricelist.deuterium * num
    const level = num
    const remainLevel = num
    let status = QueueStatusEnum.PENDING
    let startTime = null
    let endTime = null
    // 计算建造时间 s
    let seconds = Formula.fleetDefenseTime({ metal: defense.pricelist.metal, crystal: defense.pricelist.crystal }, planetSub, userSub)
    seconds = seconds * num
    // 如果没有队列
    if (!isQueue) {
      status = QueueStatusEnum.RUNNING
      const day = dayjs()
      startTime = day.valueOf()
      endTime = day.add(seconds, 'seconds').valueOf()
    }
    const newQueue = await sequelize.transaction(async (t1) => {
      // 扣减资源
      PlanetDao.updatePlanet({ metal: planet.metal - metal, crystal: planet.crystal - crystal, deuterium: planet.deuterium - deuterium }, { id: planetId })
      const buildingQueueData = {
        userId,
        planetId,
        buildCode,
        buildName: defense.name,
        level,
        remainLevel,
        metal,
        crystal,
        deuterium,
        energy: 0,
        buildType: BuildTypeEnum.DEFENSE,
        status,
        seconds,
        startTime,
        endTime,
        updateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      }
      // 加入数据库
      const rest = await BuildQueueDao.create(buildingQueueData)
      return rest
    })
    // 加入定时任务
    newQueue.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: BuildTypeEnum.DEFENSE, taskInfo: newQueue.dataValues })
    return newQueue
  }

  static async getPlanetBuildQueue (userId, planetId) {
    return await BuildQueueDao.findAllByOrderItem({ userId, planetId })
  }

  static async getPlanetBuildQueueByType (userId, planetId, buildType) {
    return await BuildQueueDao.findAllByOrderItem({ userId, planetId, buildType })
  }

  static async deleteBuildQueue (queueId) {
    const rest = await BuildQueueDao.findByPk(queueId)
    if (!rest) {
      throw new BusinessError('队列不存在')
    }
    return await sequelize.transaction(async (t1) => {
      const d = await BuildQueueDao.delete({ id: queueId })
      if (rest.status === QueueStatusEnum.RUNNING) {
        // 恢复资源
        if (rest.buildType === BuildTypeEnum.BUILDING || rest.buildType === BuildTypeEnum.RESEARCH) {
          await PlanetDao.incrementPlanet({ metal: rest.metal, crystal: rest.crystal, deuterium: rest.deuterium }, { id: rest.planetId })
          workerTimer.postMessage({ taskType: BuildTypeEnum.DELETE, taskInfo: rest })
        } else if (rest.buildType === BuildTypeEnum.FLEET || rest.buildType === BuildTypeEnum.DEFENSE) {
          // 舰队
        }
      }
      return d
    })
  }
}

export { BuildQueueService }
