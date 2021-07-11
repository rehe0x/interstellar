import path from 'path'
import Koa from 'koa'
import moment from 'moment'
import views from 'koa-views'
import _static from 'koa-static'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import { indexRouter } from './routes/index.js'
import { auth, restful, error, mylogger } from './handler/index.js'
const app = new Koa()

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

app.use(_static(path.join(path.resolve(), '/src/views/public')))
app.use(views(path.join(path.resolve(), '/src/views'), {
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
app.use(indexRouter.routes(), indexRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export { app }
