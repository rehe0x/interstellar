import { deepFreeze } from '../lib/utils.js'

const UniverseMap = {
  1: {
    name: '第一宇宙',
    description: '文明状体：2030.15.2',
    gameSpeed: 2500, // 基础速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    metalBasicIncome: 20,
    crystalBasicIncome: 10,
    deuteriumBasicIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  2: {
    name: '第二宇宙',
    description: '文明状体：2030.15.2',
    resourceSpeed: 5, // 资源倍数
    shipSpeed: 1, // 舰队速度
    buildSpeed: 5, // 建筑时间速度
    buildQueue: 5, // 建筑队列
    maxPlanet: 9 // 最大星球
  },
  3: {
    name: '第三宇宙',
    description: '文明状体：2030.15.2',
    resourceSpeed: 5, // 资源倍数
    shipSpeed: 1, // 舰队速度
    buildSpeed: 5, // 建筑时间速度
    buildQueue: 5, // 建筑队列
    maxPlanet: 9 // 最大星球
  },
  4: {
    name: '第四宇宙',
    description: '文明状体：2030.15.2',
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
