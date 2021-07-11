import Router from 'koa-router'
import { userRouter } from './users.js'

const indexRouter = new Router()
const apiRouter = new Router()

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

apiRouter.prefix('/api')
apiRouter.use(userRouter.routes(), userRouter.allowedMethods())
indexRouter.use(apiRouter.routes(), apiRouter.allowedMethods())

export { indexRouter }
