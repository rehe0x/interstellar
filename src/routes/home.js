import joi from 'joi'
import { validation } from '../handler/validation.js'
import { HomeController } from '../rehe/controller/home.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/home')

const v = {
  base: {
    planetId: joi.number().integer().required().error(new Error('星球参数错误'))
  },
  galaxy: {
    galaxyX: joi.number().integer().required().error(new Error('星球参数错误')),
    galaxyY: joi.number().integer().required().error(new Error('星球参数错误'))
  }
}

routers.get('/getUniverse', HomeController.getUniverse)
routers.get('/getStaratlas', validation({ ...v.base, ...v.galaxy }), HomeController.getStaratlas)

export { routers as homeRouter }
