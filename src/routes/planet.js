/* eslint-disable no-unused-vars */
import joi from 'joi'
import { BuildTypeEnum, QueueStatusEnum } from '../enum/base.enum.js'
import { validation } from '../handler/validation.js'
import { PlanetController } from '../rehe/controller/planet.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/planet')

const v = {
  base: {
    planetId: joi.number().integer().required().error(new Error('星球参数错误'))
  },
  queueId: {
    queueId: joi.number().integer().required().error(new Error('队列参数错误'))
  },
  buildType: {
    buildType: joi.string().valid(...Object.values(BuildTypeEnum)).required().error(new Error('建筑类型错误'))
  },
  buildCode: {
    buildCode: joi.string().required().error(new Error('建筑参数错误'))
  }
}
routers.get('/getNowTime', PlanetController.getNowTime)
routers.get('/getPlanetBuildQueue', validation(v.base), PlanetController.getPlanetBuildQueue)
routers.get('/getPlanetBuildQueueByType', validation({ ...v.base, ...v.buildType }), PlanetController.getPlanetBuildQueueByType)
routers.get('/getPlanetResources', validation(v.base), PlanetController.getPlanetResources)
routers.get('/getBuilding', validation(v.base), PlanetController.getBuilding)
routers.get('/getResearch', validation(v.base), PlanetController.getResearch)
routers.post('/addBuildingQueue', validation({ ...v.base, ...v.buildCode }), PlanetController.addBuildingQueue)
routers.post('/addResearchQueue', validation({ ...v.base, ...v.buildCode }), PlanetController.addResearchQueue)
routers.post('/deleteBuildQueue', validation(v.queueId), PlanetController.deleteBuildQueue)

export { routers as planetRouter }
