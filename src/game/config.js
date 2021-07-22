import { deepFreeze } from '../lib/utils.js'

const GameConfig = {
  // 定义已知世界 !
  MAX_GALAXY_IN_WORLD: 9,
  MAX_SYSTEM_IN_GALAXY: 499,
  MAX_PLANET_IN_SYSTEM: 15,

  SPY_REPORT_ROW: 2, // 间谍卫星报告行数?
  FIELDS_BY_MOONBASIS_LEVEL: 4, // 最大星球数量，包括殖民星和母星
  MAX_PLAYER_PLANETS: 10, // 建筑最大建造队列
  MAX_BUILDING_QUEUE_SIZE: 1000000, // 舰队&防御最大建造队列
  MAX_OVERFLOW: 1, // 最大溢出上限 1.1=110%
  // 行星基础设置
  BASE_STORAGE_SIZE: 200000, // 仓库上限
  BUILD_METAL: 20000, // 金属矿
  BUILD_CRISTAL: 20000, // 晶体矿
  BUILD_DEUTERIUM: 5000, // 重氢
  // 基础生产
  METAL_BASIC_INCOME: 20,
  CRYSTAL_BASIC_INCOME: 10,
  DEUTERIUM_BASIC_INCOME: 0,
  // 基础速度
  GAME_SPEED: 2500,
  // 建造速度
  BUILD_SPEED: 5,
  // 生产速度
  RESOURCE_MULTIPLIER: 5
}

deepFreeze(GameConfig)
export {
  GameConfig
}
