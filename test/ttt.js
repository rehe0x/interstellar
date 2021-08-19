const buildQueueList = [
  { id: 1, name: '2' },
  { id: 1, name: '3' },
  { id: 10, name: '2' },
  { id: 7, name: '3' },
  { id: 1, name: '2' },
  { id: 2, name: '3' },
  { id: 3, name: '2' }
]
// const isQueue = buildQueueList.length !== 0
// console.log(isQueue, buildQueueList)
// const f = buildQueueList.filter(item => item.name === '9').sort((a, b) => b.id - a.id)[0]
// console.log(!f)
// console.log(buildQueueList)
// buildQueueList.sort((a, b) => b.id - a.id)
// console.log(buildQueueList)
// const fg = buildQueueList.find(item => item.id === 1 && item.name === '3')
// console.log(fg)

// function getRandomChineseWord (max) {
//   const rsl = []
//   for (let index = 0; index < max; index++) {
//     const _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16)
//     rsl.push(eval('"\\u' + _randomUniCode + '"'))
//   }
//   return rsl.join('')
// }
// function randomString (length) {
//   const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   let result = ''
//   for (let i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
//   return result
// }
// console.log(randomString(10))
// const tempMiniArray = [[0, 100], [-25, 75], [-50, 50], [-75, 25], [-100, 10]]
// const groupIndex = ~~((12 - 1) / (15 / tempMiniArray.length))
// console.log(tempMiniArray[groupIndex])
// const [tMini, tMax] = tempMiniArray[groupIndex]
// console.log(tMini, tMax)

// export const sqlStr = async (item) => {
//   let sqlStr = ''
//   for (const key in item) {
//     sqlStr += `\`${key}\` = \`${key}\` + '${item[key]}',`
//   }
//   console.log(sqlStr.substring(0, sqlStr.length - 1))
// }

// sqlStr({ aaa: '1', bb: 22 })

let ff =  

// for (const key in ff) {
//   if(ff[key] === 9){
//     delete ff[key]
//   }
// }
// console.log(ff)
// if(ff && Object.keys(ff).length){
//   console.log(11)
// }

if(ff?.length){
  console.log(11)
}