import { sequelize } from '../../lib/sequelize.js'
import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { Formula } from '../../game/formula.js'
import { MissionTypeEnum, MissionStatusEnum, PlanetTypeEnum } from '../../enum/base.enum.js'
import { UniverseMap } from '../../game/universe.map.js'
import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { workerTimer } from '../../worker/worker_main.js'
import { CommonService } from '../service/common.service.js'
import { MissionQueueDao } from '../dao/mission_queue.dao.js'
import { MissionDetailDao } from '../dao/mission_detail.dao.js'
import { PlanetService } from '../service/planet.service.js'

class MissionQueueService {
  static async addMissionQueue ({
    universeId, userId, missionCode, missionTypeEnum, targetUserId, targetPlanetId,
    targetGalaxy, seconds, staySeconds
  }) {
    const rest = await MissionQueueDao.insert({
      universeId,
      userId,
      missionCode,
      missionType: missionTypeEnum.CODE,
      missionName: missionTypeEnum.VALUE,
      missionStatus: MissionStatusEnum.START,
      targetUserId,
      targetPlanetId,
      targetGalaxy,
      seconds,
      staySeconds,
      startTime: dayjs().valueOf(),
      createTime: dayjs().valueOf()
    })
    return rest
  }

  static async addMissionDetail ({
    universeId, missionId, userId, planetId, galaxy, speed, fleetList
  }) {
    const rest = await MissionDetailDao.insert({
      universeId,
      missionId,
      userId,
      planetId,
      galaxy,
      speed,
      fleetList,
      createTime: dayjs().valueOf()
    })
    return rest
  }

  static missionHandleFleetVerify ({ missionTypeEnum, planetSub, fleets }) {
    if (fleets?.length === 0) {
      throw new BusinessError('舰队参数错误')
    }
    if (missionTypeEnum.CODE === MissionTypeEnum.COLONY) {
      if (!Object.hasOwnProperty.call(fleets, 'fleetRecycler')) {
        throw new BusinessError('没有殖民船可用')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.SPY) {
      if (!Object.hasOwnProperty.call(fleets, 'fleetSpySonde')) {
        throw new BusinessError('没有探测器可用')
      }
    }
    for (const key in fleets) {
      if (Object.hasOwnProperty.call(planetSub, key)) {
        if (fleets[key] < planetSub[key]) {
          throw new BusinessError('舰队不可用')
        }
      } else {
        throw new BusinessError('舰队EORRO')
      }
    }
  }

  static async missionHandle ({ universeId, userId, planetId, missionTypeEnum, targetGalaxyX, targetGalaxyY, targetGalaxyZ, fleets }) {
    // 查询用户和星球信息
    const { userSub, planetSub, planet } = await CommonService.getUserPlanetSub(userId, planetId)
    // 发起坐标
    const { galaxyX, galaxyY, galaxyZ } = planet
    // 目标坐标值
    const targetGalaxy = `${targetGalaxyX}:${targetGalaxyY}:${targetGalaxyZ}`

    // 验证舰队数据
    MissionQueueService.missionHandleFleetVerify({ missionTypeEnum, planetSub, fleets })

    // 查询目标星球
    const targetPlanet = await PlanetService.getPlanetByGalaxy({ universeId, galaxyX: targetGalaxyX, galaxyY: targetGalaxyY, galaxyZ: targetGalaxyZ })

    // 任务区别处理
    if (missionTypeEnum.CODE === MissionTypeEnum.COLONY) {
      if (targetPlanet?.length !== 0) {
        throw new BusinessError('该位置已被殖民')
      }
    } else if (missionTypeEnum.CODE === MissionTypeEnum.EXPLORE) {
      if (!`${galaxyX}:${galaxyY}:16` === targetGalaxy) {
        throw new BusinessError('探险坐标错误')
      }
    } else {
      if (targetPlanet?.length === 0) {
        throw new BusinessError('目标不存在')
      }
    }

    // 计算时间
    const newMission = await MissionQueueService.addMissionQueue({
      universeId,
      userId,
      missionCode: 0,
      missionTypeEnum: MissionTypeEnum.COLONY,
      targetUserId: 0,
      targetPlanetId: 0,
      targetGalaxy: `${galaxyX}:${galaxyY}:${galaxyZ}`,
      seconds,
      staySeconds: 0
    })
    MissionQueueService.addMissionDetail({
      universeId,
      missionId: newMission.id,
      userId,
      planetId,
      galaxy: `${planet.galaxyX}:${planet.galaxyY}:${planet.galaxyZ}`,
      speed,
      fleetList
    })
  }
}

export {
  MissionQueueService
}
