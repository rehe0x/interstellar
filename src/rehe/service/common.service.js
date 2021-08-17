import { BusinessError } from '../../lib/error.js'
import { UserSubDao } from '../dao/user_sub.dao.js'
import { PlanetSubDao } from '../dao/planet_sub.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'

class CommonService {
  static async getUserPlanetSub (userId, planetId) {
    // 查询用户和星球信息
    const userSub = await UserSubDao.findByUserId(userId)
    const planetSub = await PlanetSubDao.findByPlanetId(planetId)
    const planet = await PlanetDao.findById(planetId)
    // 验证数据
    if (!userSub || !planetSub || !planet ||
       planetSub.userId !== userSub.userId || planet.id !== planetSub.planetId) {
      throw new BusinessError('数据错误')
    }
    return { userSub, planetSub, planet }
  }
}

export {
  CommonService
}
