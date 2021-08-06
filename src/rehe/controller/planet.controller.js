import dayjs from 'dayjs'
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
    const param = ctx.request.query
    const rest = await BuildQueueService.getPlanetBuildQueue(ctx.loginInfo.userId, param.planetId)
    ctx.success(rest)
  }

  static async getPlanetBuildQueueByType (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildQueueService.getPlanetBuildQueueByType(ctx.loginInfo.userId, param.planetId, param.buildType)
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

  static async deleteBuildQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await getLock(`deleteBuildQueue_${ctx.loginInfo.userId}`, async () => {
      return await BuildQueueService.deleteBuildQueue(param.queueId)
    })
    ctx.success(rest)
  }
}

export { PlanetController }
