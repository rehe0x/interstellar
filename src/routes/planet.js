/* eslint-disable no-unused-vars */
import joi from 'joi'
import { validation } from '../handler/validation.js'
import { PlanetController } from '../rehe/controller/planet.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/planet')

const v = {
  add: {
    // username必须是字符串类型、最小长度是2、最大长度是6、必填项、自定义验证失败错误信息
    username: joi.string().min(2).max(6).required().error(new Error('用户名格式不正确'))
    // // email必须是字符串类型、必须符合邮箱格式、必填项、自定义验证失败错误信息
    // email: joi.string().email().required().error(new Error('邮箱格式不正确')),
    // // pwd必须是字符串类型、必须符合指定的正则规则、自定义验证失败错误信息
    // pwd: joi.string().regex(/^[a-zA-Z0-9]+$/).error(new Error('密码格式不正确')),
    // // sex必须是数字类型、值是0或1、必填项、自定义验证失败错误信息
    // sex: joi.number().valid(0, 1).required().error(new Error('性别格式不正确'))
  }
}
routers.get('/getNowTime', PlanetController.getNowTime)
routers.get('/getPlanetBuildQueue', PlanetController.getPlanetBuildQueue)
routers.get('/getPlanetBuildQueueByType', PlanetController.getPlanetBuildQueueByType)
routers.get('/getPlanetResources', PlanetController.getPlanetResources)
routers.get('/getBuilding', PlanetController.getBuilding)
routers.get('/getResearch', PlanetController.getResearch)
routers.post('/addBuildingQueue', PlanetController.addBuildingQueue)
routers.post('/addResearchQueue', PlanetController.addResearchQueue)
routers.post('/deleteBuildQueue', PlanetController.deleteBuildQueue)

export { routers as planetRouter }
