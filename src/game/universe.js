import { deepFreeze } from "../lib/utils.js";

const universe = {
  1: {
    name: '第一宇宙',
    resource_speed: 5, // 资源倍数
    ship_speed: 1, //舰队速度
    build_speed: 5, // 建筑时间速度
    build_queue: 5,  // 建筑队列
    max_planet: 9 // 最大星球
  }
}

universe = deepFreeze(universe)
export {
  universe
}