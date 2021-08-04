import Jwt from 'jsonwebtoken'
import { Config } from '../../../config/index.js'
import { BusinessError } from '../../lib/error.js'
import { UserService } from '../service/user.service.js'
import { PlanetService } from '../service/planet.service.js'

class UserController {
  static async getUserPlanet (ctx, next) {
    const rest = await PlanetService.getUserPlanet(1)
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
      user = await UserService.signIn(param)
    }
    const token = Jwt.sign(
      { userId: user.id, phone: user.phone }, // 加密userToken
      Config.SECRET,
      { expiresIn: '1h' }
    )
    user.token = token
    ctx.success(user)
  }

  static async add (ctx, next) {
    const rest = await UserService.add(ctx.request.body)
    ctx.success(rest)
  }

  static async find (ctx, next) {
    const rest = await UserService.find()
    ctx.success(rest)
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
