import { sequelize } from '../../lib/sequelize.js'
import dayjs from 'dayjs'
import { BusinessError } from '../../lib/error.js'
import { Formula } from '../../game/formula.js'
import { TaskTypeEnum, BuildTypeEnum, BuildQueueStatusEnum, PlanetTypeEnum } from '../../enum/base.enum.js'
import { UniverseMap } from '../../game/universe.map.js'
import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from '../../game/build/index.js'
import { workerTimer } from '../../worker/worker_main.js'

class MissionQueue {
  static async addMissionQueue(){

  }
}