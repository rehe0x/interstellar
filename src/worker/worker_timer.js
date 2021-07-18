import assert from "assert";
import { parentPort, workerData, MessagePort } from 'worker_threads'

const slot = [] // 环形队列
var maxIndex = 3600 // 环形队列最大指针
var currentIndex =0 // 环形队列指针
const startTime = new Date().getTime();  // 起始时间
const interval = 1000 // 轮询间隔时间
let count = 0 // 计数器

const slotHandle = async (index) => {
  const arr = slot[index]
  if(arr && arr.length > 0){
    for (let i = arr.length - 1; i >= 0; i--) {
      let arrTask = arr[i]
      if(arrTask.cycle_num > 0){
        arrTask.cycle_num --
      }else{
        arr.splice(i, 1)
        workerData.port.postMessage(arrTask)
      }
    }
  }
}

const buildTimer = async () => {
  count++
  currentIndex < maxIndex ? currentIndex++ : currentIndex = 1
  slotHandle(currentIndex)
  const offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  setTimeout(buildTimer, interval - offset);
}
setTimeout(buildTimer, interval);

const pushSlot = async (task) => {
  let index = (task.seconds % maxIndex) + currentIndex
  index = index > maxIndex ? index - maxIndex : index
  task.cycle_num = Math.floor(task.seconds / maxIndex)
  if(slot[index]){
    slot[index].push(task)
  }else{
    slot[index] = new Array(task)
  }
}

parentPort.on('message', data => {
  pushSlot(data)
});

assert(workerData.port instanceof MessagePort);
parentPort.postMessage('定时线程启动成功！')

workerData.port.on('message', data => {
  pushSlot(data)
});