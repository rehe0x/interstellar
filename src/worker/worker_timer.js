import assert from 'assert'
import dayjs from 'dayjs'
import { parentPort, workerData, MessagePort } from 'worker_threads'

const slot = [] // 环形队列
const slotMap = new Map() // 环形队列map
const maxIndex = 3600 // 环形队列最大指针
let currentIndex = 0 // 环形队列指针
const startTime = dayjs().valueOf() // 起始时间
const interval = 1000 // 轮询间隔时间
let count = 0 // 计数器

const slotHandle = async (index) => {
  const arr = slot[index]
  if (arr && arr.length > 0) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const arrTask = arr[i]
      if (arrTask.cycle_num > 0) {
        arrTask.cycle_num--
      } else {
        arr.splice(i, 1)
        slotMap.delete(`${arrTask.taskType}-${arrTask.taskInfo.id}`)
        workerData.port.postMessage(arrTask)
      }
    }
  }
}

const buildTimer = async () => {
  count++
  currentIndex < maxIndex ? currentIndex++ : currentIndex = 1
  slotHandle(currentIndex)
  const offset = dayjs().valueOf() - (startTime + count * interval) // 代码执行所消耗的时间
  setTimeout(buildTimer, interval - offset)
}
setTimeout(buildTimer, interval)

const pushSlot = async (task) => {
  console.log('加入定时任务', task)
  if (task.taskInfo.seconds === 0) {
    task.taskInfo.seconds = 1
  }

  let index = (task.taskInfo.seconds % maxIndex) + currentIndex
  index = index > maxIndex ? index - maxIndex : index
  task.cycle_num = Math.floor(task.taskInfo.seconds / maxIndex)
  if (slot[index]) {
    slot[index].push(task)
  } else {
    slot[index] = [task]
  }
  slotMap.set(`${task.taskType}-${task.taskInfo.id}`, index)
}

// 主线程加入定时任务
parentPort.on('message', data => {
  pushSlot(data)
})
assert(workerData.port instanceof MessagePort)
parentPort.postMessage('定时线程启动成功！')
// 任务执行线程加入定时任务
workerData.port.on('message', data => {
  pushSlot(data)
})
