import Jwt from 'jsonwebtoken'
import { Config } from '../../../config/index.js'
import { BusinessError } from '../../lib/error.js'
import { UserService } from '../service/user.service.js'
import { PlanetService } from '../service/planet.service.js'

class UserController {
  static async getUserPlanet (ctx, next) {
    const rest = await PlanetService.getUserPlanet(ctx.loginInfo.userId)
    ctx.success(rest)
  }

  static async updateUserPlanetId (ctx, next) {
    let { planetId } = ctx.request.body
    const rest = await UserService.updateUserPlanetId({ userId: ctx.loginInfo.userId, planetId })
    ctx.success(rest)
  }

  static async sendPhoneCode (ctx, next) {
    const param = ctx.request.query
    ctx.success(param)
  }

  static async verifyPhoneCode (ctx, next) {
    const param = ctx.request.query
    ctx.success(param)
  }

  static async login (ctx, next) {
    let { universeId, phone } = ctx.request.body
    // 验证验证码
    let user = await UserService.findOneByUPhone({ universeId, phone })
    if (!user) {
      const rest = await UserService.signIn({ universeId, phone })
      user = rest.dataValues
      for (let index = 0; index < 5000; index++) {
        phone++
        await UserService.signIn({ universeId, phone })
      }
    }
    const token = Jwt.sign(
      { userId: user.id, phone: user.phone }, // 加密userToken
      Config.SECRET,
      { expiresIn: '1h' }
    )
    user.token = token
    ctx.success(user)
  }
}

export {
  UserController
}
