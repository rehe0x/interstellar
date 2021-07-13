import { BusinessError } from '../../lib/error.js'
import { BuildService } from '../service/build.js'

class BuildController {
  static async getBuilding(ctx, next){
    const rest = await BuildService.getBuilding()
    ctx.success(rest)
  }

  static async getResearch(ctx, next){
    const rest = await BuildService.getResearch()
    ctx.success(rest)
  }
}

export { BuildController }