import { UniverseMap } from '../../game/universe.map.js'
import { PlanetService } from '../service/planet.service.js'

class HomeController {
  static async getUniverse (ctx, next) {
    ctx.success(UniverseMap)
  }

  static async getStaratlas (ctx, next) {
    const { planetId, galaxyX, galaxyY } = ctx.request.query
    const rest = await PlanetService.getStaratlas({
      userId: ctx.loginInfo.userId, planetId, galaxyX, galaxyY
    })
    ctx.success(rest)
  }
}

export {
  HomeController
}
