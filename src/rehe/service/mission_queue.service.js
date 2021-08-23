import { sequelize } from '../../lib/sequelize.js'
import loadsh from 'lodash'
import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { Formula } from '../../game/formula.js'
import { TaskTypeEnum, UserStatusEnum, MissionTypeEnum, MissionStatusEnum, PlanetTypeEnum } from '../../enum/base.enum.js'
import { UniverseMap } from '../../game/universe.map.js'
import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { workerTimer } from '../../worker/worker_main.js'
import { CommonService } from '../service/common.service.js'
import { MissionQueueDao } from '../dao/mission_queue.dao.js'
import { MissionDetailDao } from '../dao/mission_detail.dao.js'
import { UserDao } from '../dao/user.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { PlanetService } from '../service/planet.service.js'
import { PlanetDao } from '../dao/planet.dao.js'

class MissionQueueService {
  static missionStaticVerify ({ universeId, planetType, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, stayTime }) {
    if (planetType !== PlanetTypeEnum.STAR && planetType !== PlanetTypeEnum.MOON) throw new BusinessError('星球类型错误')
    if (targetGalaxyX > UniverseMap[universeId].maxGalaxyX) throw new BusinessError('坐标错误X')
    if (targetGalaxyY > UniverseMap[universeId].maxGalaxyY) throw new BusinessError('坐标错误Y')
    if (targetGalaxyZ > UniverseMap[universeId].maxGalaxyZ) throw new BusinessError('坐标错误Z')
    if (speed > 100 || speed < 10 || speed % 10 !== 0) throw new BusinessError('速速错误')
    if (stayTime > 8) throw new BusinessError('停留时间错误')
  }

  static missionFleetVerify ({ missionTypeEnum, planetSub, fleets }) {
    const fleetInfo = loadsh.cloneDeep(FleetMap)

    if (!fleets || Object.keys(fleets).length === 0) {
      throw new BusinessError('舰队参数错误')
    }
    if (missionTypeEnum.CODE === MissionTypeEnum.SPY.CODE) {
      if (!Object.hasOwnProperty.call(fleets, 'fleetSpySonde') || Object.keys(fleets).length > 1) {
        throw new BusinessError('探测器数据错误')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.RECYCLE.CODE) {
      if (!Object.hasOwnProperty.call(fleets, 'fleetRecycler')) {
        throw new BusinessError('回收船数据错误')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.COLONY.CODE) {
      if (!Object.hasOwnProperty.call(fleets, 'fleetColonizer') || Object.keys(fleets).length > 1) {
        throw new BusinessError('殖民船数据错误')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.JDAM.CODE) {
      if (!Object.hasOwnProperty.call(fleets, 'defenseInterplanetaryMisil') || Object.keys(fleets).length > 1) {
        throw new BusinessError('导弹数据错误')
      }
      fleetInfo.defenseInterplanetaryMisil = {}
    }
    for (const key in fleets) {
      if (!Object.hasOwnProperty.call(fleetInfo, key) ||
      !Object.hasOwnProperty.call(planetSub, key) ||
      key === 'fleetSolarSatelit') {
        throw new BusinessError('舰队错误')
      }
      if (!fleets[key] || fleets[key] <= 0) {
        delete fleets[key]
      } else if (fleets[key] > planetSub[key]) {
        throw new BusinessError('舰队不可用')
      }
    }
  }

  static async missionTargetVerify ({ universeId, planetId, planetType, missionTypeEnum, targetGalaxyX, targetGalaxyY, targetGalaxyZ }) {
    // 区别参数
    let targetUserId = 0
    let targetPlanetId = 0
    let targetPlanetName = ''
    let targetPlanetType = PlanetTypeEnum.STAR
    if (missionTypeEnum.CODE === MissionTypeEnum.COLONY) {
      const targetPlanetList = await PlanetService.getPlanetByGalaxy({ universeId, galaxyX: targetGalaxyX, galaxyY: targetGalaxyY, galaxyZ: targetGalaxyZ })
      if (targetPlanetList?.length !== 0) {
        throw new BusinessError('该位置已被殖民')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.EXPLORE) {
      // targetGalaxyX = galaxyX; targetGalaxyY = galaxyY; targetGalaxyZ = 16
    } else {
      const targetPlanetList = await PlanetService.getPlanetByGalaxy({ universeId, planetType, galaxyX: targetGalaxyX, galaxyY: targetGalaxyY, galaxyZ: targetGalaxyZ })
      if (targetPlanetList?.length === 0) {
        throw new BusinessError('目标不存在')
      }
      const targetPlanet = targetPlanetList[0]
      // 验证目标状态
      const targetUser = await UserDao.findById(targetPlanet.userId)
      if (targetUser.status !== UserStatusEnum.NORMAL) {
        throw new BusinessError('目标不符')
      }

      // 回收任务验证 目标是否有废墟
      if (missionTypeEnum.CODE === MissionTypeEnum.RECYCLE && !targetPlanet.ruins) {
        throw new BusinessError('没有废墟可回收')
      } else {
        if (targetPlanet.id === planetId) {
          throw new BusinessError('目标不能为自己')
        }
      }

      targetUserId = targetPlanet.userId
      targetPlanetId = targetPlanet.id
      targetPlanetName = targetPlanet.name
      targetPlanetType = targetPlanet.planetType
    }
    return { targetUserId, targetPlanetId, targetPlanetName, targetPlanetType }
  }

  static missionComputeVerify ({ planet, distance, maxDistance, seconds, consumption, capacity, resources }) {
    if (!seconds) {
      throw new BusinessError('任务时间异常')
    }
    if (maxDistance) {
      // 导弹发射范围验证
      if (distance < 0 || distance > maxDistance) {
        throw new BusinessError('超出发射范围')
      }
      return
    }
    if (planet.deuterium < consumption) {
      throw new BusinessError('燃料不足无法起飞')
    }
    let totalRes = 0
    for (const key in resources) {
      totalRes += resources[key]
    }
    if (totalRes > (capacity - consumption)) {
      throw new BusinessError('携带资源超出')
    }
  }

  static async getMissionCompute ({ userId, planetId, missionTypeCode, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, fleets }) {
    // 查询用户和星球信息
    const { userSub, planet, planetSub } = await CommonService.getUserPlanetSub(userId, planetId)
    // 发起坐标
    const { galaxyX, galaxyY, galaxyZ } = planet
    // 舰队数据验证
    const missionTypeEnum = Object.values(MissionTypeEnum).find(item => item.CODE === missionTypeCode)
    MissionQueueService.missionFleetVerify({ missionTypeEnum, planetSub, fleets })
    const { maxSpeed, distance, seconds, consumption, capacity } = Formula.missionCompute({ userSub, galaxyX, galaxyY, galaxyZ, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, fleets })
    const estimatedTime = dayjs().add(seconds, 'seconds').format('YYYY-MM-DD HH:mm:ss')
    return { maxSpeed, distance, seconds, consumption, capacity, estimatedTime }
  }

  static async addMissionQueue ({
    userId, planetId, planetType, missionTypeEnum, targetGalaxyX,
    targetGalaxyY, targetGalaxyZ, speed, stayTime, fleets, resources
  }) {
    console.log('addMissionQueue', userId, planetId, planetType, missionTypeEnum, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, stayTime, fleets, resources)
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)
    // 发起坐标
    const { galaxyX, galaxyY, galaxyZ, name: planetName } = planet
    // 静态参数参数
    MissionQueueService.missionStaticVerify({ universeId: planet.universeId, planetType, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, stayTime })
    // 舰队数据验证
    MissionQueueService.missionFleetVerify({ missionTypeEnum, planetSub, fleets })
    // 目标验证
    const { targetUserId, targetPlanetId, targetPlanetName, targetPlanetType } = await MissionQueueService.missionTargetVerify({ universeId: planet.universeId, planetId, planetType, missionTypeEnum, targetGalaxyX, targetGalaxyY, targetGalaxyZ })
    // 计算 距离 速度 时间 油耗 承载
    const { maxSpeed, distance, maxDistance, seconds, consumption, capacity } = Formula.missionCompute({ userSub, galaxyX, galaxyY, galaxyZ, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, fleets })
    // 验证油耗承载 || 导弹发射范围
    MissionQueueService.missionComputeVerify({ planet, distance, maxDistance, seconds, consumption, capacity, resources })
    // 事务
    const rest = await sequelize.transaction(async (t1) => {
      const nowTime = dayjs().valueOf()
      // 扣减舰队
      await PlanetSubDao.updateDecrementLevels({ planetId, fleets, updateTime: nowTime })
      // 扣减资源
      await PlanetDao.updateDecrementResources({ metal: resources.metal, crystal: resources.crystal, deuterium: resources.deuterium + consumption, updateTime: nowTime }, { planetId })
      // 插入队列
      const newMission = await MissionQueueDao.insert({
        universeId: planet.universeId,
        userId,
        missionCode: 0,
        missionType: missionTypeEnum.CODE,
        missionName: missionTypeEnum.VALUE,
        missionStatus: MissionStatusEnum.START,
        targetUserId,
        targetPlanetId,
        targetPlanetName,
        targetPlanetType,
        targetGalaxy: `${targetGalaxyX},${targetGalaxyY},${targetGalaxyZ}`,
        distance,
        maxSpeed,
        seconds,
        staySeconds: stayTime * 3600,
        startTime: nowTime,
        createTime: nowTime
      })
      await MissionDetailDao.insert({
        universeId: planet.universeId,
        missionId: newMission.id,
        userId,
        planetId,
        planetName,
        planetType,
        galaxy: `${galaxyX},${galaxyY},${galaxyZ}`,
        speed,
        fleets,
        fleetSpeed: maxSpeed,
        consumption,
        capacity,
        resources,
        createTime: nowTime
      })
      newMission && workerTimer.postMessage({ taskType: TaskTypeEnum.MISSION, taskInfo: newMission.dataValues })
      return newMission
    })
    return rest
  }

  /**
   * 任务执行
   * @param {number} universeId
   * @param {number} userId
   * @param {number} planetId
   * @param {string} planetType 可选
   * @param {string} missionTypeCode
   * @param {number} targetGalaxyX
   * @param {number} targetGalaxyY
   * @param {number} targetGalaxyZ
   * @param {number} speed
   * @param {number} stayTime 可选 默认0
   * @param {object} fleets
   * @param {number} metal 默认0
   * @param {number} crystal 默认0
   * @param {number} deuterium 默认0
   */
  static async executeMissionHandle ({
    userId, planetId, planetType, missionTypeCode, targetGalaxyX,
    targetGalaxyY, targetGalaxyZ, speed, stayTime, fleets, metal, crystal, deuterium
  }) {
    console.log('executeMissionHandle', planetId, planetType, missionTypeCode, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, stayTime, fleets, metal, crystal, deuterium)
    let missionTypeEnum = null
    switch (missionTypeCode) {
      case MissionTypeEnum.COLONY.CODE: {
        console.log('殖民')
        planetType = PlanetTypeEnum.STAR
        missionTypeEnum = MissionTypeEnum.COLONY
        stayTime = 0
        metal = 0; crystal = 0; deuterium = 0
        break
      }
      case MissionTypeEnum.SPY.CODE: {
        console.log('探测')
        missionTypeEnum = MissionTypeEnum.SPY
        speed = 100; stayTime = 0
        metal = 0; crystal = 0; deuterium = 0
        break
      }
      case MissionTypeEnum.DISPATCH.CODE: {
        console.log('派遣')
        missionTypeEnum = MissionTypeEnum.DISPATCH
        stayTime = 0
        break
      }
      case MissionTypeEnum.TRANSPORT.CODE: {
        console.log('运输')
        missionTypeEnum = MissionTypeEnum.TRANSPORT
        stayTime = 0
        break
      }
      case MissionTypeEnum.HELP.CODE: {
        console.log('协防')
        missionTypeEnum = MissionTypeEnum.HELP
        break
      }
      case MissionTypeEnum.ATTACK.CODE: {
        console.log('攻击')
        missionTypeEnum = MissionTypeEnum.ATTACK
        stayTime = 0
        break
      }
      case MissionTypeEnum.JDAM.CODE: {
        console.log('导弹攻击')
        missionTypeEnum = MissionTypeEnum.JDAM
        speed = 100; stayTime = 0
        metal = 0; crystal = 0; deuterium = 0
        break
      }
      case MissionTypeEnum.RECYCLE.CODE: {
        console.log('回收')
        planetType = PlanetTypeEnum.STAR
        missionTypeEnum = MissionTypeEnum.DISRECYCLEPATCH
        stayTime = 0
        break
      }
      case MissionTypeEnum.EXPLORE.CODE: {
        console.log('探险')
        planetType = PlanetTypeEnum.STAR
        missionTypeEnum = MissionTypeEnum.EXPLORE
        targetGalaxyZ = 16
        stayTime = stayTime > 1 ? 1 : stayTime
        break
      }
      default: {
        console.log('Invalid code')
        break
      }
    }

    return await MissionQueueService.addMissionQueue({
      userId,
      planetId,
      planetType,
      missionTypeEnum,
      targetGalaxyX,
      targetGalaxyY,
      targetGalaxyZ,
      speed,
      stayTime,
      fleets,
      resources: { metal, crystal, deuterium }
    })
  }

  static async getUserMissionList ({ userId }) {
    const rest = await MissionDetailDao.findByUserId(userId)
    return rest
  }
}

export {
  MissionQueueService
}
