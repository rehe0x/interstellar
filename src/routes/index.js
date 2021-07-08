const Router = require('koa-router')
const users = require('./users')

const indexRouter = new Router()
const apiRouter = new Router()

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

apiRouter.prefix('/api')
apiRouter.use(users.routes(), users.allowedMethods())
indexRouter.use(apiRouter.routes(), users.allowedMethods())

module.exports = indexRouter
