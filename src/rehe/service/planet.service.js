import { PlanetDao } from '../dao/planet.dao.js'

class PlanetService {
  static async getUserPlanet (userId) {
    const rest = await PlanetDao.findAllByItem({
      userId
    })
    return rest
  }
}

export { PlanetService }
