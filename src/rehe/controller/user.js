import jwt from 'jsonwebtoken'
import { config } from '../../../config/index.js'
import { BusinessError } from '../../lib/error.js'
import { UserService } from '../service/user.js'

class UserController {
  static async login (ctx, next) {
    const param = ctx.request.body
    const user = await UserService.findOne({ username: param.username })
    if (!user) {
      throw new BusinessError('用户名不存在～')
    }
    if (user.password !== String(param.password)) {
      throw new BusinessError('密码错误～')
    }
    const token = jwt.sign(
      { name: user.username, password: user.password }, // 加密userToken
      config.SECRET,
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
