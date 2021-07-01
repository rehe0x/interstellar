const userService = require('../service/user')

exports.test = async (ctx, next) => {
  const f = await userService.test()
  ctx.success(f)
}
exports.add = async (ctx, next) => {
  const f = await userService.add()
  ctx.success(f)
}
