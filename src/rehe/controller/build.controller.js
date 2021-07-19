import { BuildService } from '../service/build.service.js'
import { BuildQueueService } from '../service/build_queue.service.js'

class BuildController {
  static async getBuilding (ctx, next) {
    const rest = await BuildService.getBuilding()
    ctx.success(rest)
  }

  static async getResearch (ctx, next) {
    const rest = await BuildService.getResearch()
    ctx.success(rest)
  }

  static async addBuildingQueue (ctx, next) {
    const rest = await BuildQueueService.addBuildingQueue(1, 1, 'buildingMetalMine')
    ctx.success(rest)
  }

  static async addResearchQueue (ctx, next) {
    const rest = await BuildQueueService.addResearchQueue(1, 1, 'researchSpyTech')
    ctx.success(rest)
  }
}

export { BuildController }
