import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { BuildTypeEnum, QueueStatusEnum } from '../../enum/base.enum.js'
import { Formula } from '../../game/formula.js'
import { sequelize } from '../../lib/sequelize.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { ResourcesService } from '../service/resources.service.js'
import { FleetMap, DefenseMap } from '../../game/build/index.js'

class WorkerTaskService {
  constructor (workerData) {
    this.workerData = workerData
  }

  async getUserPlanetSub (userId, planetId) {
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

  async initQueueTask () {
    // 先执行研究单队列
    const researchArr = await BuildQueueDao.findAllByBuildType(BuildTypeEnum.RESEARCH)
    researchArr.forEach(item => {
      console.log('researchArr', item)
      const nowTime = dayjs().valueOf()
      const endTime = item.endTime
      if (endTime <= nowTime) {
        // 马上执行
        item.seconds = 1
      } else {
        item.seconds = Math.floor((endTime - nowTime) / 1000)
      }
      this.workerData.port.postMessage({ taskType: BuildTypeEnum.RESEARCH, taskInfo: item })
    })

    // 建筑队列
    const buildingArr = await BuildQueueDao.findAllGroupByPlanet(BuildTypeEnum.BUILDING)
    buildingArr.forEach(async (item) => {
      console.log('buildingArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询用户和星球信息
        const { userSub, planetSub, planet } = await this.getUserPlanetSub(item.userId, item.planetId)
        if (item.metal > planet.metal || item.crystal > planet.crystal || item.deuterium > planet.deuterium) {
          // 资源不足删除所有队列
          BuildQueueDao.delete({ planetId: item.planetId, status: QueueStatusEnum.PENDING })
          throw new BusinessError('资源不足')
        }
        // 扣减资源
        await PlanetDao.updatePlanet({ metal: planet.metal - item.metal, crystal: planet.crystal - item.crystal, deuterium: planet.deuterium - item.deuterium }, { id: item.planetId })
        // 计算建造时间 s
        item.seconds = Formula.buildingTime({ metal: item.metal, crystal: item.crystal }, planetSub, userSub)
        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          updateTime: dayjs().valueOf()
        }, { id: item.id })
        if (rest[0] === 1) {
          this.workerData.port.postMessage({ taskType: BuildTypeEnum.BUILDING, taskInfo: item })
        }
      } else {
        const nowTime = dayjs().valueOf()
        const endTime = item.endTime
        if (endTime <= nowTime) {
          // 马上执行
          item.seconds = 1
        } else {
          item.seconds = Math.floor((endTime - nowTime) / 1000)
        }
        this.workerData.port.postMessage({ taskType: BuildTypeEnum.BUILDING, taskInfo: item })
      }
    })

    // 建筑队列
    const fleetArr = await BuildQueueDao.findAllGroupByPlanet(BuildTypeEnum.FLEET)
    fleetArr.forEach(async (item) => {
      console.log('fleetArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询建筑信息
        const fleetObj = FleetMap[item.buildCode]
        if (!fleetObj) {
          throw new BusinessError('建造不存在')
        }
        // 查询用户和星球信息
        const { userSub, planetSub } = await this.getUserPlanetSub(item.userId, item.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: fleetObj.pricelist.metal, crystal: fleetObj.pricelist.crystal }, planetSub, userSub)
        item.seconds = seconds * item.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { id: item.id })
        if (rest[0] === 1) {
          this.workerData.port.postMessage({ taskType: BuildTypeEnum.FLEET, taskInfo: item })
        }
      } else {
        const nowTime = dayjs().valueOf()
        const endTime = item.endTime
        if (endTime <= nowTime) {
          // 马上执行
          item.seconds = 1
        } else {
          item.seconds = Math.floor((endTime - nowTime) / 1000)
        }
        this.workerData.port.postMessage({ taskType: BuildTypeEnum.FLEET, taskInfo: item })
      }
    })

    // 建筑队列
    const defenseArr = await BuildQueueDao.findAllGroupByPlanet(BuildTypeEnum.DEFENSE)
    defenseArr.forEach(async (item) => {
      console.log('defenseArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询建筑信息
        const defenseObj = DefenseMap[item.buildCode]
        if (!defenseObj) {
          throw new BusinessError('建造不存在')
        }
        // 查询用户和星球信息
        const { userSub, planetSub } = await this.getUserPlanetSub(item.userId, item.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: defenseObj.pricelist.metal, crystal: defenseObj.pricelist.crystal }, planetSub, userSub)
        item.seconds = seconds * item.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { id: item.id })
        if (rest[0] === 1) {
          this.workerData.port.postMessage({ taskType: BuildTypeEnum.DEFENSE, taskInfo: item })
        }
      } else {
        const nowTime = dayjs().valueOf()
        const endTime = item.endTime
        if (endTime <= nowTime) {
          // 马上执行
          item.seconds = 1
        } else {
          item.seconds = Math.floor((endTime - nowTime) / 1000)
        }
        this.workerData.port.postMessage({ taskType: BuildTypeEnum.DEFENSE, taskInfo: item })
      }
    })
  }

  async finishQueueTask (task) {
    if (task.taskType === BuildTypeEnum.BUILDING) {
      this.finishBuildingQueueTask(task.taskInfo).then(rest => {
        rest && typeof rest.seconds !== 'undefined' && this.workerData.port.postMessage({ taskType: task.taskType, taskInfo: rest })
      })
    } else if (task.taskType === BuildTypeEnum.RESEARCH) {
      this.finishResearchQueueTask(task.taskInfo)
    } else if (task.taskType === BuildTypeEnum.FLEET || task.taskType === BuildTypeEnum.DEFENSE) {
      this.finishFDQueueTask(task.taskInfo).then(rest => {
        rest && typeof rest.seconds !== 'undefined' && this.workerData.port.postMessage({ taskType: task.taskType, taskInfo: rest })
      })
    }
  }

  async finishBuildingQueueTask (taskInfo) {
    await sequelize.transaction(async (t1) => {
      // 先更新产量
      await ResourcesService.updatePlanetResources(taskInfo.userId, taskInfo.planetId)
      // 修改等级
      PlanetSubDao.updateLevel(taskInfo.buildCode, taskInfo.planetId, taskInfo.level)
      // 写入日志
      BuildQueueDao.insertLog('finishBuildQueueTask', JSON.stringify(taskInfo), dayjs().valueOf())
      // 删除队列
      await BuildQueueDao.delete({ id: taskInfo.id })
    })
    // 加入后续任务 && 验证星球资源, 修改状态&时间
    return this.addBuildingQueueTask(taskInfo)
  }

  async addBuildingQueueTask (taskInfo) {
    return sequelize.transaction(async (t2) => {
      const buildQueueOne = await BuildQueueDao.findOneByOrderTime({ planetId: taskInfo.planetId, buildType: taskInfo.buildType })
      if (buildQueueOne) {
        // 查询用户和星球信息
        const { userSub, planetSub, planet } = await this.getUserPlanetSub(taskInfo.userId, taskInfo.planetId)

        if (buildQueueOne.metal > planet.metal || buildQueueOne.crystal > planet.crystal || buildQueueOne.deuterium > planet.deuterium) {
          // 资源不足删除所有队列
          return BuildQueueDao.delete({ planetId: taskInfo.planetId, status: QueueStatusEnum.PENDING })
          // throw new BusinessError('资源不足' + planet)
        }
        // 扣减资源
        PlanetDao.updatePlanet({ metal: planet.metal - buildQueueOne.metal, crystal: planet.crystal - buildQueueOne.crystal, deuterium: planet.deuterium - buildQueueOne.deuterium }, { id: buildQueueOne.planetId })
        // 计算建造时间 s
        buildQueueOne.seconds = Formula.buildingTime({ metal: buildQueueOne.metal, crystal: buildQueueOne.crystal }, planetSub, userSub)
        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          status: QueueStatusEnum.RUNNING,
          seconds: buildQueueOne.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(buildQueueOne.seconds, 'seconds').valueOf(),
          updateTime: dayjs().valueOf()
        }, { id: buildQueueOne.id })
        if (rest[0] === 1) {
          return BuildQueueDao.findByPk(buildQueueOne.id)
        } else {
          throw new BusinessError('错误')
        }
      }
    })
  }

  async finishResearchQueueTask (taskInfo) {
    return sequelize.transaction((t1) => {
      // 修改等级
      UserSubDao.updateLevel(taskInfo.buildCode, taskInfo.userId, taskInfo.level)
      // 写入日志
      BuildQueueDao.insertLog('finishBuildQueueTask', JSON.stringify(taskInfo), dayjs().valueOf())
      // 删除队列
      return BuildQueueDao.delete({ id: taskInfo.id })
    })
  }

  async finishFDQueueTask (taskInfo) {
    await sequelize.transaction(async (t1) => {
      const rest = await BuildQueueDao.findByPk(taskInfo.id)
      if (!rest) {
        throw new BusinessError('队列不存在')
      }
      // 先更新产量
      await ResourcesService.updatePlanetResources(taskInfo.userId, taskInfo.planetId)
      // 修改数量
      PlanetSubDao.updateIncrementLevel(taskInfo.buildCode, taskInfo.planetId, rest.remainLevel)
      // 星球已用空间+1
      PlanetDao.incrementPlanet({ sizeUsed: 1 }, { id: taskInfo.planetId })
      // 写入日志
      BuildQueueDao.insertLog('finishFDQueueTask', JSON.stringify(taskInfo), dayjs().valueOf())
      // 删除队列
      await BuildQueueDao.delete({ id: taskInfo.id })
    })
    // 加入后续任务 && 验证星球资源, 修改状态&时间
    return this.addFDQueueTask(taskInfo)
  }

  async addFDQueueTask (taskInfo) {
    return sequelize.transaction(async (t2) => {
      const buildQueueOne = await BuildQueueDao.findOneByOrderTime({ planetId: taskInfo.planetId, buildType: taskInfo.buildType })
      if (buildQueueOne) {
        // 查询建筑信息
        const fdObj = taskInfo.buildType === BuildTypeEnum.FLEET ? FleetMap[buildQueueOne.buildCode] : DefenseMap[buildQueueOne.buildCode]
        if (!fdObj) {
          throw new BusinessError('建造不存在')
        }
        // 查询用户和星球信息
        const { userSub, planetSub } = await this.getUserPlanetSub(taskInfo.userId, taskInfo.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: fdObj.pricelist.metal, crystal: fdObj.pricelist.crystal }, planetSub, userSub)
        buildQueueOne.seconds = seconds * buildQueueOne.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueue({
          status: QueueStatusEnum.RUNNING,
          seconds: buildQueueOne.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(buildQueueOne.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { id: buildQueueOne.id })
        if (rest[0] === 1) {
          return BuildQueueDao.findByPk(buildQueueOne.id)
        } else {
          throw new BusinessError('错误')
        }
      }
    })
  }
}

export { WorkerTaskService }
