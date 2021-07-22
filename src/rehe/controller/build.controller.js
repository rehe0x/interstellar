import { BuildService } from '../service/build.service.js'
import { BuildQueueService } from '../service/build_queue.service.js'
import { ResourcesService } from '../service/resources.service.js'

class BuildController {
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

  static async addBuildingQueue (ctx, next) {
    const rest = await BuildQueueService.addBuildingQueue(1, 3, 'buildingMetalMine')
    ctx.success(rest)
  }

  static async addResearchQueue (ctx, next) {
    const rest = await BuildQueueService.addResearchQueue(1, 3, 'researchSpy')
    ctx.success(rest)
  }
}

export { BuildController }
