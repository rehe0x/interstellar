const config = require('../../../config')
const { BusinessError } = require('../../models/error')

const jwt = require('jsonwebtoken')
const userService = require('../service/user')

class UserController {
  async login (ctx, next) {
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

  async add (ctx, next) {
    const rest = await userService.add(ctx.request.body)
    ctx.success(rest)
  }

  async find (ctx, next) {
    const rest = await userService.find()
    ctx.success(rest)
  }

  async findPage (ctx, next) {
    const param = ctx.request.body
    const rest = await userService.findPage(param)
    ctx.success(rest)
  }

  async findPageQuery (ctx, next) {
    const param = ctx.request.body
    const rest = await userService.findPageQuery(param)
    ctx.success(rest)
  }
}

module.exports = new UserController()
