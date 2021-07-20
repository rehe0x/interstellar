import { Worker, MessageChannel } from 'worker_threads'
const { port1, port2 } = new MessageChannel()

// 主线程
const workerTimer = new Worker('./w.js', {
  workerData: {
    port: port1
  },
  transferList: [port1]
})
const workerTask = new Worker('./t.js', {
  workerData: {
    port: port2
  },
  transferList: [port2]
})

workerTimer.on('message', (data) => {
  console.log(data)
})
workerTask.on('message', (data) => {
  console.log(data, new Date())
})

export { workerTimer }
