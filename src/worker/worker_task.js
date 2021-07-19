import assert from 'assert'
import { parentPort, workerData, MessagePort } from 'worker_threads'
import { WorkerTaskService } from '../rehe/service/worker_task.service.js'

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('任务执行线程启动成功！')

const wts = new WorkerTaskService(workerData)
workerData.port.on('message', (task) => {
  wts.finishQueueTask(task)
})
