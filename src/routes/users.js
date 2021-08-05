import joi from 'joi'
import { validation } from '../handler/validation.js'
import { UserController } from '../rehe/controller/user.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/user')

const v = {
  login: {
    universeId: joi.number().min(1).max(99).required().error(new Error('请选择宇宙')),
    phone: joi.number().integer().required().error(new Error('手机号不正确')),
    code: joi.number().integer().required().error(new Error('验证码不正确'))
  }
}
routers.get('/sendPhoneCode', UserController.sendPhoneCode)
routers.get('/verifyPhoneCode', UserController.verifyPhoneCode)
routers.get('/getUserPlanet', UserController.getUserPlanet)
routers.post('/login', validation(v.login), UserController.login)
routers.get('/findPage', UserController.findPage)
routers.get('/findPageQuery', UserController.findPageQuery)

export { routers as userRouter }
