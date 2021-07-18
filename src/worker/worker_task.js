import assert from "assert";
import { parentPort, workerData, MessagePort } from 'worker_threads'
import { sequelize } from '../lib/sequelize.js'
import { BuildQueue } from '../rehe/dao/buildQueue.js'
import { Planet } from '../rehe/dao/planet.js'

workerData.port.on('message', async (task) => {
  sequelize.transaction(async (t1) => {
     console.log('执行', task)
  
    // 修改星球等级
    Planet.updateLevel(task)
    // 写入日志
    BuildQueue.insertLog('finishBuildQueue', JSON.stringify(task), new Date())
    // 删除完成任务列
    BuildQueue.destroy({
      where: {
        id: task.id
      }
    })
  
    // 加入后续任务 && 验证星球资源, 修改状态&时间
    const queueOne = await BuildQueue.findOneByOrderTime({
      planetId: task.planetId
    })
    const planet = await Planet.findByPk(task.planetId,{ transaction: null })
    if(queueOne){
      if(queueOne.metal > planet.metal || queueOne.crystal > planet.crystal || queueOne.deuterium > planet.deuterium){
          // 资源不足删除所有队列
        BuildQueue.destroy({
          where: {
            planetId: task.planetId,
            status: 'pending'
          }
        })
        throw new BusinessError('资源不足' + planet)
      }
      Planet.update({
        metal: planet.metal - queueOne.metal,
        crystal: planet.crystal - queueOne.crystal,
        deuterium: planet.deuterium - queueOne.deuterium
      },{
        where: {
          id: queueOne.planetId
        }
      })
  
      //加入执行队列
      const rest = await BuildQueue.update({
        status: 'running',
        startTime: new Date(),
        endTime: new Date((new Date() + queueOne.seconds * 1000)),
        updateTime: new Date()
      },{
        where: {
          id: queueOne.id
        }
      })
      if(rest[0] === 1){
        workerData.port.postMessage(await BuildQueue.findByPk(queueOne.id))
      }
    }
  })
  parentPort.postMessage('ok') // 向父线程发送数据
});

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('任务执行线程启动成功！')
