import assert from 'assert'
import dayjs from 'dayjs'

import { parentPort, workerData, MessagePort } from 'worker_threads'
import { remainingTime } from '../../src/lib/utils.js'

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
        slotMap.delete(`${arrTask.seconds}-${arrTask.date}`)
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

export const pushSlot = async (task) => {
  let index = (task.seconds % maxIndex) + currentIndex
  index = index > maxIndex ? index - maxIndex : index
  task.cycle_num = Math.floor(task.seconds / maxIndex)
  task.cycle_nums = Math.floor(task.seconds / maxIndex)
  task.index = index
  task.date = dayjs().valueOf() / 1000
  task.datex = dayjs().format()
  task.dates = dayjs((task.date + task.seconds) * 1000).format()
  task.endDate = remainingTime(task.seconds)
  task.currentIndex = currentIndex
  if (slot[index]) {
    slot[index].push(task)
  } else {
    slot[index] = new Array(task)
  }
  slotMap.set(`${task.seconds}-${task.date}`, index)
}

parentPort.on('message', data => {
  pushSlot(data)
})

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('定时线程启动成功！')
