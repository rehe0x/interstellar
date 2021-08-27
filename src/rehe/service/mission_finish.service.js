
import { sequelize } from '../../lib/sequelize.js'
import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { genRandom, getRandomChineseWord, getRandomString } from '../../lib/utils.js'
import { Formula } from '../../game/formula.js'
import { PlanetTypeEnum, PlanetLabelEnum, MissionStatusEnum } from '../../enum/base.enum.js'
import { UniverseMap } from '../../game/universe.map.js'
import { PlanetDao } from '../dao/planet.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { MissionQueueDao } from '../dao/mission_queue.dao.js'
import { MissionDetailDao } from '../dao/mission_detail.dao.js'
import { PlanetService } from '../service/planet.service.js'

class MissionFinishService {
  static async colony ({ userId, universeId, galaxyX, galaxyY, galaxyZ }) {
    const planetName = UniverseMap[universeId].basePlanetName
    const rest = await PlanetService.createPlanet({ userId, universeId, planetName, planetType: PlanetTypeEnum.STAR, label: PlanetLabelEnum.STARCOLONY, galaxyX, galaxyY, galaxyZ })
    let message = '成功'
    if (!rest) {
      // 失败消息
      message = '失败了'
    }
    return { del: true, message }
  }

  static async dispatch ({ targetPlanetId, fleets, resources }) {
    // 增加舰队
    await PlanetSubDao.updateIncrementLevels({ planetId: targetPlanetId, fleets, updateTime: dayjs().valueOf() })
    // 增加资源
    await PlanetDao.updateIncrementResources({ metal: resources.metal, crystal: resources.crystal, deuterium: resources.deuterium, updateTime: dayjs().valueOf() }, { planetId: targetPlanetId })
    return { del: true, message: '' }
  }

  static async transport ({ planetId, targetPlanetId, missionId, missionStatus, fleets, resources }) {
    if (missionStatus === MissionStatusEnum.START) {
      // 增加资源
      await PlanetDao.updateIncrementResources({ metal: resources.metal, crystal: resources.crystal, deuterium: resources.deuterium, updateTime: dayjs().valueOf() }, { planetId: targetPlanetId })
      // 更新状态
      missionStatus = MissionStatusEnum.BACK
      await MissionQueueDao.updateMissionStatus({ missionId, missionStatus, backTime: dayjs().valueOf(), updateTime: dayjs().valueOf() })
      const missionTask = await MissionQueueDao.findById(missionId)
      if (missionTask.missionStatus === MissionStatusEnum.BACK) {
        return { task: missionTask, message: '抵达消息' }
      }
    } else if (missionStatus === MissionStatusEnum.BACK) {
      // 增加舰队
      await PlanetSubDao.updateIncrementLevels({ planetId, fleets, updateTime: dayjs().valueOf() })
      // 写入消息
      return { del: true, message: '返回消息' }
    }
  }
}

export {
  MissionFinishService
}
