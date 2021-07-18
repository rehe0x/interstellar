import path from "path";
import { Worker, MessageChannel } from 'worker_threads'
const { port1, port2 } = new MessageChannel();

const workerTimer = new Worker(path.join(path.resolve(), '/src/worker/worker_timer.js'), {
	workerData: {
		port: port1
	},
	transferList: [port1]
});
const workerTask = new Worker(path.join(path.resolve(), '/src/worker/worker_task.js'), {
	workerData: {
		port: port2
	},
	transferList: [port2]
});

workerTimer.on('message',(data)=>{
    console.log(data)
});
workerTask.on('message',(data)=>{
    console.log(data, new Date())
});

export { workerTimer }