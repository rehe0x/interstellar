import dayjs from 'dayjs'
import { getLock } from '../../lib/utils.js'
import { BuildTypeEnum } from '../../enum/base.enum.js'
import { BuildService } from '../service/build.service.js'
import { BuildQueueService } from '../service/build_queue.service.js'
import { ResourcesService } from '../service/resources.service.js'
import { PlanetService } from '../service/planet.service.js'
import { MissionQueueService } from '../service/mission_queue.service.js'
class MainController {
  static async getNowTime (ctx, next) {
    ctx.success({ nowTime: dayjs().valueOf() })
  }

  static async getPlanetResources (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await ResourcesService.getPlanetResources(ctx.loginInfo.userId, +planetId)
    ctx.success(rest)
  }

  static async getUserPlanetInfo (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await PlanetService.getUserPlanetInfo({ userId: ctx.loginInfo.userId, planetId })
    ctx.success(rest)
  }

  static async getPlanetBuildQueue (ctx, next) {
    const { planetId, buildType } = ctx.request.query
    const rest = await BuildQueueService.getPlanetBuildQueue(ctx.loginInfo.userId, +planetId, buildType)
    ctx.success(rest)
  }

  static async getBuilding (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await BuildService.getBuilding(ctx.loginInfo.userId, +planetId)
    ctx.success(rest)
  }

  static async getResearch (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await BuildService.getResearch(ctx.loginInfo.userId, +planetId)
    ctx.success(rest)
  }

  static async getFleet (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await BuildService.getFleet(ctx.loginInfo.userId, +planetId)
    ctx.success(rest)
  }

  static async getDefense (ctx, next) {
    const { planetId } = ctx.request.query
    const rest = await BuildService.getDefense(ctx.loginInfo.userId, +planetId)
    ctx.success(rest)
  }

  static async addBuildingQueue (ctx, next) {
    const { planetId, buildCode } = ctx.request.body
    const rest = await getLock(`addBuildingQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addBuildingQueue(ctx.loginInfo.userId, +planetId, buildCode)
    })
    ctx.success(rest)
  }

  static async addResearchQueue (ctx, next) {
    const { planetId, buildCode } = ctx.request.body
    const rest = await getLock(`addResearchQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addResearchQueue(ctx.loginInfo.userId, +planetId, buildCode)
    })
    ctx.success(rest)
  }

  static async addFleetQueue (ctx, next) {
    const { planetId, buildCode, buildNum } = ctx.request.body
    const rest = await getLock(`addFleetQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addFDQueue(ctx.loginInfo.userId, +planetId, buildCode, buildNum, BuildTypeEnum.FLEET)
    })
    ctx.success(rest)
  }

  static async addDefenseQueue (ctx, next) {
    const { planetId, buildCode, buildNum } = ctx.request.body
    const rest = await getLock(`addDefenseQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addFDQueue(ctx.loginInfo.userId, +planetId, buildCode, buildNum, BuildTypeEnum.DEFENSE)
    })
    ctx.success(rest)
  }

  static async deleteBuildQueue (ctx, next) {
    const { queueId } = ctx.request.body
    const rest = await getLock(`deleteBuildQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.deleteBuildQueue(+queueId)
    })
    ctx.success(rest)
  }

  static async getStaratlas (ctx, next) {
    const { planetId, galaxyX, galaxyY } = ctx.request.query
    const rest = await PlanetService.getStaratlas({
      userId: ctx.loginInfo.userId, planetId, galaxyX, galaxyY
    })
    ctx.success(rest)
  }

  static async getMissionCompute (ctx, next) {
    const { planetId, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed = 100, fleets } = ctx.request.query
    const rest = await MissionQueueService.getMissionCompute({ userId: ctx.loginInfo.userId, planetId, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, fleets })
    ctx.success(rest)
  }

  static async executeMission (ctx, next) {
    const {
      planetId, planetType, missionTypeCode, targetGalaxyX,
      targetGalaxyY, targetGalaxyZ, speed = 100, stayTime = 0, fleets, metal = 0, crystal = 0, deuterium = 0
    } = ctx.request.body
    const rest = await getLock(`executeMission_${ctx.loginInfo.userId}`, async () => {
      return await MissionQueueService.executeMissionHandle({
        userId: ctx.loginInfo.userId,
        planetId,
        planetType,
        missionTypeCode,
        targetGalaxyX,
        targetGalaxyY,
        targetGalaxyZ,
        speed,
        stayTime,
        fleets,
        metal,
        crystal,
        deuterium
      })
    })
    ctx.success(rest)
  }
}

export { MainController }
