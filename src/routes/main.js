/* eslint-disable no-unused-vars */
import joi from 'joi'
import { BuildTypeEnum, QueueStatusEnum } from '../enum/base.enum.js'
import { validation } from '../handler/validation.js'
import { MainController } from '../rehe/controller/main.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/main')

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
  },
  buildNum: {
    buildNum: joi.number().min(1).max(9999).required().error(new Error('建造数量参数错误'))
  },
  galaxy: {
    galaxyX: joi.number().integer().required().error(new Error('星球参数错误')),
    galaxyY: joi.number().integer().required().error(new Error('星球参数错误'))
  }
}
routers.get('/getNowTime', MainController.getNowTime)
routers.get('/getPlanetResources', validation(v.base), MainController.getPlanetResources)
routers.get('/getUserPlanetInfo', validation(v.base), MainController.getUserPlanetInfo)
routers.get('/getPlanetBuildQueue', validation(v.base), MainController.getPlanetBuildQueue)
routers.get('/getBuilding', validation(v.base), MainController.getBuilding)
routers.get('/getResearch', validation(v.base), MainController.getResearch)
routers.get('/getFleet', validation(v.base), MainController.getFleet)
routers.get('/getDefense', validation(v.base), MainController.getDefense)
routers.post('/addBuildingQueue', validation({ ...v.base, ...v.buildCode }), MainController.addBuildingQueue)
routers.post('/addResearchQueue', validation({ ...v.base, ...v.buildCode }), MainController.addResearchQueue)
routers.post('/addFleetQueue', validation({ ...v.base, ...v.buildCode, ...v.buildNum }), MainController.addFleetQueue)
routers.post('/addDefenseQueue', validation({ ...v.base, ...v.buildCode, ...v.buildNum }), MainController.addDefenseQueue)
routers.post('/deleteBuildQueue', validation(v.queueId), MainController.deleteBuildQueue)
routers.get('/getStaratlas', validation({ ...v.base, ...v.galaxy }), MainController.getStaratlas)

export { routers as mainRouter }
