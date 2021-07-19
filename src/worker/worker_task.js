import assert from 'assert'
import { parentPort, workerData, MessagePort } from 'worker_threads'
import { sequelize } from '../lib/sequelize.js'
import { BuildQueueDao } from '../rehe/dao/build_queue.dao.js'
import { PlanetDao } from '../rehe/dao/planet.dao.js'

workerData.port.on('message', async (task) => {
  sequelize.transaction(async (t1) => {
    console.log('执行', task)

    // 修改星球等级
    PlanetDao.updateLevel(task)
    // 写入日志
    BuildQueueDao.insertLog('finishBuildQueue', JSON.stringify(task), new Date())
    // 删除完成任务列
    BuildQueueDao.destroy({
      where: {
        id: task.id
      }
    })

    // 加入后续任务 && 验证星球资源, 修改状态&时间
    const queueOne = await BuildQueueDao.findOneByOrderTime({
      planetId: task.planetId
    })
    const planet = await PlanetDao.findByPk(task.planetId, { transaction: null })
    if (queueOne) {
      if (queueOne.metal > planet.metal || queueOne.crystal > planet.crystal || queueOne.deuterium > planet.deuterium) {
        // 资源不足删除所有队列
        BuildQueueDao.destroy({
          where: {
            planetId: task.planetId,
            status: 'pending'
          }
        })
        throw new BusinessError('资源不足' + planet)
      }
      PlanetDao.update({
        metal: planet.metal - queueOne.metal,
        crystal: planet.crystal - queueOne.crystal,
        deuterium: planet.deuterium - queueOne.deuterium
      }, {
        where: {
          id: queueOne.planetId
        }
      })

      // 加入执行队列
      const rest = await BuildQueueDao.update({
        status: 'running',
        startTime: new Date(),
        endTime: new Date((new Date() + queueOne.seconds * 1000)),
        updateTime: new Date()
      }, {
        where: {
          id: queueOne.id
        }
      })
      if (rest[0] === 1) {
        workerData.port.postMessage(await BuildQueueDao.findByPk(queueOne.id))
      }
    }
  })
  parentPort.postMessage('ok') // 向父线程发送数据
})

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('任务执行线程启动成功！')
