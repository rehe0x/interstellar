const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const config = require('../../config')
// eslint-disable-next-line no-unused-vars
const { BusinessError, HttpError } = require('../model/error')

router.prefix('/users')

router.get('/login', (ctx, next) => {
  const token = jwt.sign(
    { name: 'test', password: '123123' }, // 加密userToken
    config.SECRET,
    { expiresIn: '1h' }
  )
  ctx.success({
    name: '123',
    token
  })
})

router.get('/test/:id', async (ctx, next) => {
  // ctx.success(ctx.params.id)
  throw new BusinessError(123, 'test')
})

module.exports = router
