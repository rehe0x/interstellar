import { HomeController } from '../rehe/controller/home.controller.js'
import Router from 'koa-router'

const routers = new Router()
routers.prefix('/home')

routers.get('/getUniverse', HomeController.getUniverse)

export { routers as homeRouter }
