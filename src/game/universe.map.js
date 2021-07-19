import { deepFreeze } from '../lib/utils.js'

const UniverseMap = {
  1: {
    name: '第一宇宙',
    resourceSpeed: 5, // 资源倍数
    shipSpeed: 1, // 舰队速度
    buildSpeed: 5, // 建筑时间速度
    buildQueue: 5, // 建筑队列
    maxPlanet: 9 // 最大星球
  }
}

deepFreeze(UniverseMap)
export {
  UniverseMap
}
