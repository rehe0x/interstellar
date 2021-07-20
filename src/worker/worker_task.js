import assert from 'assert'
import { parentPort, workerData, MessagePort } from 'worker_threads'
import { WorkerTaskService } from '../rehe/service/worker_task.service.js'

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('任务执行线程启动成功！')

const wts = new WorkerTaskService(workerData)
// 初始化
wts.initQueueTask()
workerData.port.on('message', async (task) => {
  console.log('完成', task)
  wts.finishQueueTask(task)
})
