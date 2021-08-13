import dayjs from 'dayjs'
import { BuildTypeEnum } from '../../enum/base.enum.js'
import { getLock } from '../../lib/utils.js'
import { BuildService } from '../service/build.service.js'
import { BuildQueueService } from '../service/build_queue.service.js'
import { ResourcesService } from '../service/resources.service.js'

class PlanetController {
  static async getNowTime (ctx, next) {
    ctx.success({ nowTime: dayjs().valueOf() })
  }

  static async getPlanetResources (ctx, next) {
    const param = ctx.request.query
    const rest = await ResourcesService.getPlanetResources(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getBuilding (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildService.getBuilding(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getResearch (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildService.getResearch(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getFleet (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildService.getFleet(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getDefense (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildService.getDefense(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getPlanetBuildQueue (ctx, next) {
    const { planetId, buildType } = ctx.request.query
    if (!buildType) {
      await ResourcesService.updatePlanetBuild(ctx.loginInfo.userId, planetId)
    }
    const rest = await BuildQueueService.getPlanetBuildQueue(ctx.loginInfo.userId, planetId, buildType)
    ctx.success(rest)
  }

  static async addBuildingQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`addBuildingQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addBuildingQueue(ctx.loginInfo.userId, param.planetId, param.buildCode)
    })
    ctx.success(rest)
  }

  static async addResearchQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`addResearchQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addResearchQueue(ctx.loginInfo.userId, param.planetId, param.buildCode)
    })
    ctx.success(rest)
  }

  static async addFleetQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`addFleetQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addFDQueue(ctx.loginInfo.userId, param.planetId, param.buildCode, param.buildNum, BuildTypeEnum.FLEET)
    })
    ctx.success(rest)
  }

  static async addDefenseQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`addDefenseQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.addFDQueue(ctx.loginInfo.userId, param.planetId, param.buildCode, param.buildNum, BuildTypeEnum.DEFENSE)
    })
    ctx.success(rest)
  }

  static async deleteBuildQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`deleteBuildQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.deleteBuildQueue(param.queueId)
    })
    ctx.success(rest)
  }
}

export { PlanetController }
