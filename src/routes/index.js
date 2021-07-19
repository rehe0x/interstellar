import Router from 'koa-router'
import { userRouter } from './users.js'
import { buildRouter } from './build.js'

const indexRouter = new Router()
const apiRouter = new Router()
apiRouter.prefix('/api')

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

indexRouter.get('/build', async (ctx, next) => {
  ctx.body = {

  }
})
// 注册路由 》 api
apiRouter.use(userRouter.routes(), userRouter.allowedMethods())
apiRouter.use(buildRouter.routes(), buildRouter.allowedMethods())

// api > 主路由
indexRouter.use(apiRouter.routes(), apiRouter.allowedMethods())
export { indexRouter }
