import { BusinessError } from '../../lib/error.js'
import { BuildTypeEnum, QueueStatusEnum } from '../../enum/base.enum.js'
import { sequelize } from '../../lib/sequelize.js'
import { BuildQueueDao } from '../dao/build_queue.dao.js'
import { PlanetDao } from '../dao/planet.dao.js'

class WorkerTaskService {
  constructor (workerData) {
    this.workerData = workerData
  }

  finishQueueTask (task) {
    if (task.taskType === BuildTypeEnum.BUILDING) {
      this.finishBuildingQueueTask(task.taskInfo).then(rest => {
        rest && this.workerData.port.postMessage({ taskType: BuildTypeEnum.BUILDING, taskInfo: rest })
      })
    } else if (task.taskType === BuildTypeEnum.RESEARCH) {
      this.finishResearchQueueTask(task.taskInfo)
    }
  }

  finishBuildingQueueTask (taskInfo) {
    return sequelize.transaction(async (t1) => {
      // 修改等级
      PlanetDao.updateLevel(taskInfo.buildCode, taskInfo.planetId)
      // 写入日志
      BuildQueueDao.insertLog('finishBuildQueueTask', JSON.stringify(taskInfo), new Date())
      // 删除队列
      BuildQueueDao.destroy({ where: { id: taskInfo.id } })
      // 加入后续任务 && 验证星球资源, 修改状态&时间
      const buildQueueOne = await BuildQueueDao.findOneByOrderTime({ planetId: taskInfo.planetId })

      if (buildQueueOne) {
        // 查询星球信息
        const planet = await PlanetDao.findByPk(taskInfo.planetId)
        if (!planet) {
          throw new BusinessError('星球不存在')
        }
        if (buildQueueOne.metal > planet.metal || buildQueueOne.crystal > planet.crystal || buildQueueOne.deuterium > planet.deuterium) {
          // 资源不足删除所有队列
          BuildQueueDao.destroy({ where: { planetId: taskInfo.planetId, status: QueueStatusEnum.PENDING } })
          throw new BusinessError('资源不足' + planet)
        }
        // 扣减资源
        PlanetDao.update({ metal: planet.metal - buildQueueOne.metal, crystal: planet.crystal - buildQueueOne.crystal, deuterium: planet.deuterium - buildQueueOne.deuterium }, {
          where: { id: buildQueueOne.planetId }
        })

        // 修改为执行队列
        const rest = await BuildQueueDao.update({
          status: QueueStatusEnum.RUNNING,
          startTime: new Date(),
          endTime: new Date((new Date() + buildQueueOne.seconds * 1000)),
          updateTime: new Date()
        }, {
          where: {
            id: buildQueueOne.id
          }
        })
        if (rest[0] === 1) {
          return BuildQueueDao.findByPk(buildQueueOne.id)
        }
      }
    })
  }

  finishResearchQueueTask (taskInfo) {
    sequelize.transaction((t1) => {
      // 修改等级
      PlanetDao.updateLevel(taskInfo.buildCode, taskInfo.planetId)
      // 写入日志
      BuildQueueDao.insertLog('finishBuildQueueTask', JSON.stringify(taskInfo), new Date())
      // 删除队列
      return BuildQueueDao.destroy({ where: { id: taskInfo.id } })
    })
  }
}

export { WorkerTaskService }
