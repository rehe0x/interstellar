import { BuildService } from '../service/build.service.js'
import { BuildQueueService } from '../service/build_queue.service.js'
import { ResourcesService } from '../service/resources.service.js'

class PlanetController {
  static async getPlanetResources (ctx, next) {
    const rest = await ResourcesService.getPlanetResources(1, 3)
    ctx.success(rest)
  }

  static async getBuilding (ctx, next) {
    const rest = await BuildService.getBuilding(1, 3)
    ctx.success(rest)
  }

  static async getResearch (ctx, next) {
    const rest = await BuildService.getResearch(1, 3)
    ctx.success(rest)
  }

  static async getPlanetBuildQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await BuildQueueService.getPlanetBuildQueue(1, 3)
    ctx.success(rest)
  }

  static async getPlanetBuildQueueByType (ctx, next) {
    const param = ctx.request.query
    const rest = await BuildQueueService.getPlanetBuildQueueByType(1, 3, param.buildType)
    ctx.success(rest)
  }

  static async addBuildingQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await BuildQueueService.addBuildingQueue(1, 3, param.buildCode)
    ctx.success(rest)
  }

  static async addResearchQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await BuildQueueService.addResearchQueue(1, 3, param.buildCode)
    ctx.success(rest)
  }

  static async deleteBuildQueue (ctx, next) {
    const param = ctx.request.body
    const rest = await BuildQueueService.deleteBuildQueue(param.queueId)
    ctx.success(rest)
  }
}

export { PlanetController }
