import Jwt from 'jsonwebtoken'
import { Config } from '../../../config/index.js'
import { BusinessError } from '../../lib/error.js'
import { UserService } from '../service/user.service.js'
import { PlanetService } from '../service/planet.service.js'

class UserController {
  static async getUserPlanet (ctx, next) {
    const param = ctx.request.query
    const rest = await PlanetService.getUserPlanet(ctx.loginInfo.userId)
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
    const param = ctx.request.body
    // 验证验证码
    let user = await UserService.findOne({ universeId: param.universeId, phone: param.phone })
    if (!user) {
      const rest = await UserService.signIn(param)
      user = rest.dataValues
      for (let index = 0; index < 5000; index++) {
        param.phone++
        await UserService.signIn(param)
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

  static async findPage (ctx, next) {
    const param = ctx.request.body
    const rest = await UserService.findPage(param)
    ctx.success(rest)
  }

  static async findPageQuery (ctx, next) {
    const param = ctx.request.body
    const rest = await UserService.findPageQuery(param)
    ctx.success(rest)
  }
}

export {
  UserController
}
