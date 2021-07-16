import { BusinessError } from '../../lib/error.js'
import { BuildService } from '../service/build.js'
import { BuildQueueService } from '../service/buildQueue.js'


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
    const rest = await BuildQueueService.addBuildingQueue(1, 1, 'building_metal_mine')
    ctx.success(rest)
  }
}

export { BuildController }
