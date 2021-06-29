const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const indexRoutes = require('./routes')
const { auth, restful, error } = require('./handler')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(require('path').join(__dirname, '/views/public')))
app.use(views(require('path').join(__dirname, '/views'), {
  extension: 'ejs'
}))

// 统一异常处理
app.use(error)

// 统一返回
app.use(restful())

// auth
app.use(auth().unless([
  '/',
  '/favicon.ico',
  /\/api\/admin\/auth/,
  /\/api\/users\/login/
]))

// routes
app.use(indexRoutes.routes(), indexRoutes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
