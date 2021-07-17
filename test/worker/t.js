import assert from "assert";
import { parentPort, workerData, MessagePort } from 'worker_threads'

workerData.port.on('message',data => {
  const t = Math.floor((new Date().getTime()/ 1000) - Number(data.date)) - data.seconds
  console.log(t,'>', data, new Date())
  if(t > 1 || t < -1){
      console.log(t,'>>>', data, new Date())
  }
  parentPort.postMessage('ok') // 向父线程发送数据
});

assert(workerData.port instanceof MessagePort)
parentPort.postMessage('任务执行线程启动成功！')
