const buildQueueList = [
  { id: 1, name: '2' },
  { id: 3, name: '3' },
  { id: 10, name: '2' },
  { id: 7, name: '3' },
  { id: 1, name: '2' },
  { id: 2, name: '3' },
  { id: 3, name: '2' }
]
const isQueue = buildQueueList.length !== 0
console.log(isQueue, buildQueueList)
const f = buildQueueList.filter(item => item.name === '9').sort((a, b) => b.id - a.id)[0]
console.log(!f)
// console.log(buildQueueList)
// buildQueueList.sort((a, b) => b.id - a.id)
// console.log(buildQueueList)
