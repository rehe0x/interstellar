import { building } from "../src/game/build/building.js";
import { remainingTime } from "../src/lib/utils.js";

const slot = []
const slotHandle = async (index) => {
  const arr = slot[index]
  // console.log(index, arr ? arr.length : 0,`time ${new Date()}`)
  if(arr && arr.length > 0){
    for (let i = arr.length - 1; i >= 0; i--) {
      let arrTask = arr[i]
      if(arrTask.cycle_num > 0){
        arrTask.cycle_num --
      }else{
        arr.splice(i, 1)
        const t = Math.floor((new Date().getTime()/ 1000) - Number(arrTask.date)) - arrTask.seconds
        // console.log(t,'>', arrTask, index, new Date())
        if(t > 1 || t < -1){
          console.log(t,'>>>', arrTask, index, new Date())
        }
        //执行
      }
    }
  }else{
    // console.log('no')
  }
}

var maxIndex = 3600
var currentIndex =0

export const pushSlot = async (task) => {
  let index = (task.seconds % maxIndex) + currentIndex
  index = index > maxIndex ? index - maxIndex : index
  task.cycle_num = Math.floor(task.seconds / maxIndex)
  task.cycle_nums = Math.floor(task.seconds / maxIndex)
  task.index = index
  task.date = new Date().getTime() / 1000
  task.datex = new Date()
  task.dates = new Date((task.date + task.seconds) * 1000)
  task.endDate = remainingTime(task.seconds)
  task.currentIndex = currentIndex
  if(slot[index]){
    slot[index].push(task)
  }else{
    slot[index] = new Array(task)
  }
}


var startTime = new Date().getTime();
var interval = 1000
var currentInterval = interval
var count = 0
const buildTimer = async () => {
  count++
  var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  
  currentIndex < maxIndex ? currentIndex++ : currentIndex = 1
  slotHandle(currentIndex)
  currentInterval = interval - offset // 得到下一次循环所消耗的时间
  setTimeout(buildTimer, currentInterval);
}

setTimeout(buildTimer, currentInterval);
