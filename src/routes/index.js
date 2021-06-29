const Router = require('koa-router')
const users = require('./users')

const indexRouter = new Router()
const apiRouter = new Router()

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

indexRouter.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

indexRouter.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

apiRouter.prefix('/api')
apiRouter.use(users.routes(), users.allowedMethods())
indexRouter.use(apiRouter.routes(), users.allowedMethods())

module.exports = indexRouter
