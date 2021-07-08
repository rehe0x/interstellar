const Koa = require('koa')
const app = new Koa()
const moment = require('moment')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const indexRoutes = require('./routes')
const { auth, restful, error, mylogger } = require('./handler')

// 统一返回
app.use(restful())
// 统一异常处理
app.use(error)

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())

// 使用日志中间件
const _logger = logger((str, args) => {
  console.log(moment().format('YYYY-MM-DD HH:mm:ss') + str)
})
app.use(mylogger).use(_logger)

app.use(require('koa-static')(require('path').join(__dirname, '/views/public')))
app.use(views(require('path').join(__dirname, '/views'), {
  extension: 'ejs'
}))

// // auth
// app.use(auth().unless([
//   '/',
//   '/favicon.ico',
//   /\/api\/admin\/auth/,
//   /\/api\/users\/login/
// ]))

// routes
app.use(indexRoutes.routes(), indexRoutes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
