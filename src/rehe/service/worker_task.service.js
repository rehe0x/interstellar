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
import { CommonService } from '../service/common.service.js'
import { UserService } from '../service/user.service.js'

class WorkerTaskService {
  constructor (workerData) {
    this.workerData = workerData
  }

  async initQueueTask () {
    // 先执行研究单队列
    const researchArr = await BuildQueueDao.findByBuildType(BuildTypeEnum.RESEARCH)
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
    const buildingArr = await BuildQueueDao.findByBuildTypeGroup(BuildTypeEnum.BUILDING)
    buildingArr.forEach(async (item) => {
      console.log('buildingArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询用户和星球信息
        const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(item.userId, item.planetId)
        if ((item.sizeUsed >= item.sizeMax) || item.metal > planet.metal || item.crystal > planet.crystal || item.deuterium > planet.deuterium) {
          // 资源不足删除所有队列
          BuildQueueDao.deleteByPlanetId({ planetId: item.planetId, status: QueueStatusEnum.PENDING })
          throw new BusinessError('资源/空间不足')
        }
        // 扣减资源
        await PlanetDao.updateIncrementResources({ metal: -item.metal, crystal: -item.crystal, deuterium: -item.deuterium, updateTime: dayjs().valueOf() }, { planetId: item.planetId })
        // 计算建造时间 s
        item.seconds = Formula.buildingTime({ metal: item.metal, crystal: item.crystal }, planetSub, userSub)
        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueueRun({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { queueId: item.id })
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

    // 舰队队列
    const fleetArr = await BuildQueueDao.findByBuildTypeGroup(BuildTypeEnum.FLEET)
    fleetArr.forEach(async (item) => {
      console.log('fleetArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询用户和星球信息
        const { userSub, planetSub } = await CommonService.getUserPlanetSub(item.userId, item.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: item.metal, crystal: item.crystal }, planetSub, userSub)
        item.seconds = seconds * item.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueueRun({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { queueId: item.id })
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
    const defenseArr = await BuildQueueDao.findByBuildTypeGroup(BuildTypeEnum.DEFENSE)
    defenseArr.forEach(async (item) => {
      console.log('defenseArr', item)
      if (item.status !== QueueStatusEnum.RUNNING) {
        // 查询用户和星球信息
        const { userSub, planetSub } = await CommonService.getUserPlanetSub(item.userId, item.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: item.metal, crystal: item.crystal }, planetSub, userSub)
        item.seconds = seconds * item.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueueRun({
          status: QueueStatusEnum.RUNNING,
          seconds: item.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(item.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { queueId: item.id })
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
      const rest = await this.finishBuildingQueueTask(task.taskInfo)
      typeof rest?.seconds !== 'undefined' && this.workerData.port.postMessage({ taskType: task.taskType, taskInfo: rest })
    } else if (task.taskType === BuildTypeEnum.RESEARCH) {
      this.finishResearchQueueTask(task.taskInfo)
    } else if (task.taskType === BuildTypeEnum.FLEET || task.taskType === BuildTypeEnum.DEFENSE) {
      const rest = await this.finishFDQueueTask(task.taskInfo)
      typeof rest?.seconds !== 'undefined' && this.workerData.port.postMessage({ taskType: task.taskType, taskInfo: rest })
    }
  }

  async finishBuildingQueueTask (taskInfo) {
    await sequelize.transaction(async (t1) => {
      // 先更新产量
      await ResourcesService.updatePlanetResources(taskInfo.userId, taskInfo.planetId)
      // 修改等级
      PlanetSubDao.updateLevel({ planetId: taskInfo.planetId, code: taskInfo.buildCode, level: taskInfo.level, updateTime: dayjs().valueOf() })
      // 星球已用空间+1
      PlanetDao.updateIncrementSzie({ sizeUsed: 1, updateTime: dayjs().valueOf() }, { planetId: taskInfo.planetId })
      // 如果是月球基地和地形改造器 增加空间4
      if (taskInfo.buildCode === 'buildingMondbasis' || taskInfo.buildCode === 'buildingTerraformer') {
        PlanetDao.updateIncrementSzie({ sizeMax: 4, updateTime: dayjs().valueOf() }, { planetId: taskInfo.planetId })
      }
      // 更新积分
      UserService.updatePoints({ metal: taskInfo.metal, crystal: taskInfo.crystal, deuterium: taskInfo.deuterium, userId: taskInfo.userId })
      // 写入日志
      BuildQueueDao.insertLog({ title: 'finishBuildQueueTask', text: JSON.stringify(taskInfo), time: dayjs().valueOf() })
      // 删除队列
      await BuildQueueDao.deleteById(taskInfo.id)
    })
    // 加入后续任务 && 验证星球资源, 修改状态&时间
    return this.addBuildingQueueTask(taskInfo)
  }

  async addBuildingQueueTask (taskInfo) {
    return sequelize.transaction(async (t2) => {
      const buildQueueOne = await BuildQueueDao.findOnePlanetByTypeIdAsc({ userId: taskInfo.userId, planetId: taskInfo.planetId, buildType: taskInfo.buildType })
      if (buildQueueOne) {
        // 查询用户和星球信息
        const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(taskInfo.userId, taskInfo.planetId)
        if ((planet.sizeUsed >= planet.sizeMax) || buildQueueOne.metal > planet.metal || buildQueueOne.crystal > planet.crystal || buildQueueOne.deuterium > planet.deuterium) {
          // 资源/空间不足删除所有队列
          return BuildQueueDao.deleteByPlanetId({ planetId: taskInfo.planetId, status: QueueStatusEnum.PENDING })
          // throw new BusinessError('资源不足' + planet)
        }
        // 扣减资源
        PlanetDao.updateIncrementResources({ metal: -buildQueueOne.metal, crystal: buildQueueOne.crystal, deuterium: -buildQueueOne.deuterium, updateTime: dayjs().valueOf() }, { planetId: buildQueueOne.planetId })
        // 计算建造时间 s
        buildQueueOne.seconds = Formula.buildingTime({ metal: buildQueueOne.metal, crystal: buildQueueOne.crystal }, planetSub, userSub)
        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueueRun({
          status: QueueStatusEnum.RUNNING,
          seconds: buildQueueOne.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(buildQueueOne.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { queueId: buildQueueOne.id })
        if (rest[0] === 1) {
          return BuildQueueDao.findById(buildQueueOne.id)
        } else {
          throw new BusinessError('错误')
        }
      }
    })
  }

  async finishResearchQueueTask (taskInfo) {
    return sequelize.transaction((t1) => {
      // 修改等级
      UserSubDao.updateLevel({ userId: taskInfo.userId, code: taskInfo.buildCode, level: taskInfo.level, updateTime: dayjs().valueOf() })
      // 写入日志
      BuildQueueDao.insertLog({ title: 'finishBuildQueueTask', text: JSON.stringify(taskInfo), time: dayjs().valueOf() })
      // 更新积分
      UserService.updatePoints({ metal: taskInfo.metal, crystal: taskInfo.crystal, deuterium: taskInfo.deuterium, userId: taskInfo.userId })
      // 删除队列
      return BuildQueueDao.deleteById(taskInfo.id)
    })
  }

  async finishFDQueueTask (taskInfo) {
    await sequelize.transaction(async (t1) => {
      const rest = await BuildQueueDao.findById(taskInfo.id)
      if (!rest) {
        throw new BusinessError('队列不存在')
      }
      // 先更新产量
      await ResourcesService.updatePlanetResources(taskInfo.userId, taskInfo.planetId)
      // 修改数量
      PlanetSubDao.updateIncrementLevel({ planetId: taskInfo.planetId, code: taskInfo.buildCode, level: rest.remainLevel, updateTime: dayjs().valueOf() })
      // 更新积分
      UserService.updatePoints({ metal: rest.metal * rest.remainLevel, crystal: rest.crystal * rest.remainLevel, deuterium: rest.deuterium * rest.remainLevel, userId: taskInfo.userId })
      // 写入日志
      BuildQueueDao.insertLog({ title: 'finishFDQueueTask', text: JSON.stringify(taskInfo), time: dayjs().valueOf() })
      // 删除队列
      await BuildQueueDao.deleteById(taskInfo.id)
    })
    // 加入后续任务 && 验证星球资源, 修改状态&时间
    return this.addFDQueueTask(taskInfo)
  }

  async addFDQueueTask (taskInfo) {
    return sequelize.transaction(async (t2) => {
      const buildQueueOne = await BuildQueueDao.findOnePlanetByTypeIdAsc({ userId: taskInfo.userId, planetId: taskInfo.planetId, buildType: taskInfo.buildType })
      if (buildQueueOne) {
        // 查询用户和星球信息
        const { userSub, planetSub } = await CommonService.getUserPlanetSub(taskInfo.userId, taskInfo.planetId)

        const seconds = Formula.fleetDefenseTime({ metal: buildQueueOne.metal, crystal: buildQueueOne.crystal }, planetSub, userSub)
        buildQueueOne.seconds = seconds * buildQueueOne.remainLevel

        // 修改为执行队列
        const rest = await BuildQueueDao.updateBuildQueueRun({
          status: QueueStatusEnum.RUNNING,
          seconds: buildQueueOne.seconds,
          startTime: dayjs().valueOf(),
          endTime: dayjs().add(buildQueueOne.seconds, 'seconds').valueOf(),
          remainUpdateTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf()
        }, { queueId: buildQueueOne.id })
        if (rest[0] === 1) {
          return BuildQueueDao.findById(buildQueueOne.id)
        } else {
          throw new BusinessError('错误')
        }
      }
    })
  }
}

export { WorkerTaskService }
