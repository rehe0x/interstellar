import { UniverseMap } from '../../game/universe.map.js'

class HomeController {
  static async getUniverse (ctx, next) {
    ctx.success(UniverseMap)
  }
}

export {
  HomeController
}
