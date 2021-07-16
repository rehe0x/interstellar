import { pushSlot } from "./array.js";
const genRandom = (min, max) => (Math.random() * (max - min + 1) | 0) + min;
function t(){
  setTimeout(t, genRandom(100, 1000));
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
  pushSlot({seconds: genRandom(1, 10000)})
}
t()


// var period = 60 * 1000 * 60 * 2
// var startTime = new Date().getTime();
// var count = 0
// var end = new Date().getTime() + period
// var interval = 1000
// var currentInterval = interval

// function loop() {
//   count++
//   var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
//   console.log(offset)
//   var diff = end - new Date().getTime()
//   var h = Math.floor(diff / (60 * 1000 * 60))
//   var hdiff = diff % (60 * 1000 * 60)
//   var m = Math.floor(hdiff / (60 * 1000))
//   var mdiff = hdiff % (60 * 1000)
//   var s = mdiff / (1000)
//   var sCeil = Math.ceil(s)
//   var sFloor = Math.floor(s)
//   currentInterval = interval - offset // 得到下一次循环所消耗的时间
//   console.log(currentInterval)
//   console.log(count,'时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) // 打印 时 分 秒 代码执行时间 下次循环间隔

//   setTimeout(loop, currentInterval)
// }
// loop()
// setTimeout(loop, currentInterval)

// let testArr = [1,2,3,4,5,6,7,8]

// for (let index = testArr.length - 1; index >= 0; index--) {
//   const element = testArr[index];
//   element % 2 === 0 && testArr.splice(index, 1)
//   console.log(element)
//   console.log(testArr)

// }