const config = require('../../../config')
const { BusinessError } = require('../../lib/error')

const jwt = require('jsonwebtoken')
const userService = require('../service/user')

class UserController {
  static async login (ctx, next) {
    const param = ctx.request.body
    const user = await userService.findOne({ username: param.username })
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
    const rest = await userService.add(ctx.request.body)
    ctx.success(rest)
  }

  static async find (ctx, next) {
    const rest = await userService.find()
    ctx.success(rest)
  }

  static async findPage (ctx, next) {
    const param = ctx.request.body
    const rest = await userService.findPage(param)
    ctx.success(rest)
  }

  static async findPageQuery (ctx, next) {
    const param = ctx.request.body
    const rest = await userService.findPageQuery(param)
    ctx.success(rest)
  }
}

module.exports = UserController
