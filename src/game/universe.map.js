import { deepFreeze } from '../lib/utils.js'

const UniverseMap = {
  1: {
    name: '第一宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000, // 重氢
    basePlanetSzie: 166,  //星球初始大小
    basePlanetName: '殖民地', //默认名称
    buildQueueMax: 5, // 建造最大队列

    // shipSpeed: 1, // 舰队速度
    // maxPlanet: 9 // 最大星球
  },
  2: {
    name: '第二宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000, // 重氢
    basePlanetSzie: 166
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  3: {
    name: '第三宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  4: {
    name: '第四宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  5: {
    name: '第无宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  6: {
    name: '第六宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  7: {
    name: '第七宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  8: {
    name: '第八宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  9: {
    name: '第九宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  },
  10: {
    name: '第十宇宙',
    description: '文明状体：2030.15.2',
    brBuildSpeed: 2500, // 基础速度
    fdBuildSpeed: 5000, // 舰队防御速度
    resourceSpeed: 5, // 资源倍数
    buildSpeed: 5, // 建筑时间速度
    baseStorageSize: 200000, // 仓库上限
    maxOverflow: 1, // 最大溢出上限 1.1=110%
    baseMetalIncome: 20,
    baseCrystalIncome: 10,
    baseDeuteriumIncome: 0,
    baseMetal: 200000, // 金属矿
    baseCristal: 200000, // 晶体矿
    baseDeuterium: 5000 // 重氢
    // shipSpeed: 1, // 舰队速度
    // buildQueue: 5, // 建筑队列
    // maxPlanet: 9 // 最大星球
  }
}

deepFreeze(UniverseMap)
export {
  UniverseMap
}
