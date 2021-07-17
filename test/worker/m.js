import { workerTimer } from "./u.js";

const genRandom = (min, max) => (Math.random() * (max - min + 1) | 0) + min;
function t(){
  setTimeout(t, genRandom(100, 1000));
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
  workerTimer.postMessage({seconds: genRandom(1, 10000)})
}
t()