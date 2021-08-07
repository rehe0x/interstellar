import { Config } from '../../config/index.js'
import { LoginError } from '../lib/error.js'
import jwt from 'jsonwebtoken'

export const auth = (option = {}) => {
  const auth = async function verify (ctx, next) {
    let data = null
    try {
      const token = ctx.header.authorization
      data = await jwt.verify(token, Config.SECRET)
    } catch (error) {
      throw new LoginError('登陆过期')
    }
    if (data) {
      ctx.loginInfo = data
      // ctx.status = 200 //这里非常重要，只有设置了status，koa-router才识别请求正确继续进入路由
      await next()
    }
  }
  auth.unless = function (options = []) {
    const originalMiddleware = this
    return async function (ctx, next) {
      const y = options.some(function (p) {
        return (typeof p === 'string' && ctx.url.startsWith(p)) ||
          (p instanceof RegExp && !!p.exec(ctx.url))
      })
      if (y) {
        await next()
      } else {
        await originalMiddleware.call(this, ctx, next)
      }
    }
  }
  return auth
}
