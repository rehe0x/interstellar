const config = require('../../../config')
const { BusinessError } = require('../../models/error')

const jwt = require('jsonwebtoken')
const userService = require('../service/user')

class UserController {
  async login (ctx, next) {
    const param = ctx.request.body
    let user = await userService.findByItem({ username: param.username })
    if (!user[0]) {
      throw new BusinessError('用户名不存在～')
    }
    user = user[0]
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
}

module.exports = new UserController()
