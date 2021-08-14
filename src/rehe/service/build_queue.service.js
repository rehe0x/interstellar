import dayjs from 'dayjs'
import loadsh from 'lodash'
import { BusinessError } from '../../lib/error.js'
import { sequelize } from '../../lib/sequelize.js'
import { BuildTypeEnum, QueueStatusEnum, PlanetTypeEnum } from '../../enum/base.enum.js'
import { Formula } from '../../game/formula.js'
import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { workerTimer } from '../../worker/worker_main.js'
import { CommonService } from '../service/common.service.js'
class BuildQueueService {
  static async addBuildingQueue (userId, planetId, buildCode) {
    return await sequelize.transaction(async (t1) => {
      // 查询用户和星球信息
      const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)
      // 查询建筑信息
      let building = {}
      if (PlanetTypeEnum.STAR === planet.planetType) {
        building = BuildingMap[buildCode]
      } else if (PlanetTypeEnum.MOON === planet.planetType) {
        building = BuildingMoonMap[buildCode]
      }
      if (!building) {
        throw new BusinessError('建筑不存在')
      }
      // 判断星球空间是否足够
      if (planet.sizeUsed >= planet.sizeMax) {
        throw new BusinessError('星球空间不足')
      }
      const requeriment = Formula.isRequeriment(building, planetSub, userSub)
      if (!requeriment.isReq) {
        throw new BusinessError(JSON.stringify(requeriment.requeriments))
      }
      // 查询星球队列信息
      const buildQueueList = await BuildQueueDao.findPlanetByType({ userId, planetId, buildType: BuildTypeEnum.BUILDING })
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
        PlanetDao.incrementResources({ metal: -metal, crystal: -crystal, deuterium: -deuterium }, { planetId })
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
      const rest = await BuildQueueDao.insert(buildingQueueData)
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
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)

    const requeriment = Formula.isRequeriment(research, planetSub, userSub)
    if (!requeriment.isReq) {
      throw new BusinessError(JSON.stringify(requeriment.requeriments))
    }
    // 查询星球队列信息 等级降序查询 取一个
    const buildQueueOne = await BuildQueueDao.findOneUserByType({ userId, buildType: BuildTypeEnum.RESEARCH })
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
        PlanetDao.incrementResources({ metal: -metal, crystal: -crystal, deuterium: -deuterium }, { planetId })
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
        const rest = await BuildQueueDao.insert(buildingQueueData)
        return rest
      })
      // 加入定时任务
      newQueue.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: BuildTypeEnum.RESEARCH, taskInfo: newQueue.dataValues })
      return newQueue
    } else {
      throw new BusinessError('还有研究未完成')
    }
  }

  static async addFDQueue (userId, planetId, buildCode, buildNum, buildType) {
    // 查询建筑信息
    const fdObj = buildType === BuildTypeEnum.FLEET ? FleetMap[buildCode] : DefenseMap[buildCode]
    if (!fdObj) {
      throw new BusinessError('建造不存在')
    }
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)

    const requeriment = Formula.isRequeriment(fdObj, planetSub, userSub)
    if (!requeriment.isReq) {
      throw new BusinessError(JSON.stringify(requeriment.requeriments))
    }
    // 查询星球队列信息
    const buildQueueList = await BuildQueueDao.findPlanetByType({ userId, planetId, buildType: buildType })
    const isQueue = buildQueueList.length !== 0
    // 计算造价，资源不足 按最小数量生产
    if (fdObj.pricelist.metal * buildNum > planet.metal) {
      buildNum = (planet.metal / fdObj.pricelist.metal) < 1 ? 0 : Math.floor(planet.metal / fdObj.pricelist.metal)
    }
    if (fdObj.pricelist.crystal * buildNum > planet.crystal) {
      const crystalNum = (planet.crystal / fdObj.pricelist.crystal) < 1 ? 0 : Math.floor(planet.crystal / fdObj.pricelist.crystal)
      crystalNum < buildNum && (buildNum = crystalNum)
    }
    if (fdObj.pricelist.deuterium * buildNum > planet.deuterium) {
      const deuteriumNum = (planet.deuterium / fdObj.pricelist.deuterium) < 1 ? 0 : Math.floor(planet.deuterium / fdObj.pricelist.deuterium)
      deuteriumNum < buildNum && (buildNum = deuteriumNum)
    }
    if (buildNum <= 0) {
      return
    }
    const metal = fdObj.pricelist.metal * buildNum
    const crystal = fdObj.pricelist.crystal * buildNum
    const deuterium = fdObj.pricelist.deuterium * buildNum
    const level = buildNum
    const remainLevel = buildNum
    let status = QueueStatusEnum.PENDING
    let startTime = null
    let endTime = null
    let remainUpdateTime = null
    // 计算建造时间 s
    let seconds = Formula.fleetDefenseTime({ metal: fdObj.pricelist.metal, crystal: fdObj.pricelist.crystal }, planetSub, userSub)
    seconds = seconds * buildNum
    // 如果没有队列
    if (!isQueue) {
      status = QueueStatusEnum.RUNNING
      const day = dayjs()
      startTime = day.valueOf()
      endTime = day.add(seconds, 'seconds').valueOf()
      remainUpdateTime = day.valueOf()
    }
    const newQueue = await sequelize.transaction(async (t1) => {
      // 扣减资源
      PlanetDao.incrementResources({ metal: -metal, crystal: -crystal, deuterium: -deuterium }, { planetId })
      const buildQueueData = {
        userId,
        planetId,
        buildCode,
        buildName: fdObj.name,
        level,
        remainLevel,
        metal,
        crystal,
        deuterium,
        energy: 0,
        buildType: buildType,
        status,
        seconds,
        startTime,
        endTime,
        remainUpdateTime,
        updateTime: dayjs().valueOf(),
        createTime: dayjs().valueOf()
      }
      // 加入数据库
      const rest = await BuildQueueDao.insert(buildQueueData)
      return rest
    })
    // 加入定时任务
    newQueue.status === QueueStatusEnum.RUNNING && workerTimer.postMessage({ taskType: buildType, taskInfo: newQueue.dataValues })
    return newQueue
  }

  static async getPlanetBuildQueue (userId, planetId, buildType) {
    if (!buildType) {
      await this.updatePlanetBuildQueueFD(userId, planetId)
    }
    return await BuildQueueDao.findByItem({ userId, planetId, buildType })
  }

  // 舰队防御更新
  static async updatePlanetBuildQueueFD (userId, planetId, buildType) {
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

  static async deleteBuildQueue (queueId) {
    const rest = await BuildQueueDao.findById(queueId)
    if (!rest) {
      throw new BusinessError('队列不存在')
    }
    return await sequelize.transaction(async (t1) => {
      const d = await BuildQueueDao.deleteById(queueId)
      if (rest.buildType === BuildTypeEnum.BUILDING || rest.buildType === BuildTypeEnum.RESEARCH) {
        // 恢复资源
        if (rest.status === QueueStatusEnum.RUNNING) {
          await PlanetDao.incrementResources({ metal: rest.metal, crystal: rest.crystal, deuterium: rest.deuterium }, { planetId: rest.planetId })
          workerTimer.postMessage({ taskType: BuildTypeEnum.DELETE, taskInfo: rest })
        }
      } else if (rest.buildType === BuildTypeEnum.FLEET || rest.buildType === BuildTypeEnum.DEFENSE) {
        const fdObj = rest.buildType === BuildTypeEnum.FLEET ? FleetMap[rest.buildCode] : DefenseMap[rest.buildCode]
        if (!fdObj) {
          throw new BusinessError('建造不存在')
        }
        await PlanetDao.incrementResources({ metal: fdObj.pricelist.metal * rest.remainLevel, crystal: fdObj.pricelist.crystal * rest.remainLevel, deuterium: fdObj.pricelist.deuterium * rest.remainLevel }, { planetId: rest.planetId })
        workerTimer.postMessage({ taskType: BuildTypeEnum.DELETE, taskInfo: rest })
      }
      return d
    })
  }
}

export { BuildQueueService }
