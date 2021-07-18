import { deepFreeze } from "../lib/utils.js";

export const setting = {
  // 定义已知世界 !
  MAX_GALAXY_IN_WORLD: 9,
  MAX_SYSTEM_IN_GALAXY: 499,
  MAX_PLANET_IN_SYSTEM: 15,

  SPY_REPORT_ROW: 2, // 间谍卫星报告行数?
  FIELDS_BY_MOONBASIS_LEVEL: 4, // 最大星球数量，包括殖民星和母星
  MAX_PLAYER_PLANETS: 10, // 建筑最大建造队列
  MAX_BUILDING_QUEUE_SIZE: 1000000, // 舰队&防御最大建造队列
  MAX_OVERFLOW: 1.1, // 最大溢出上限 1.1=110%
  // 行星基础设置
  BASE_STORAGE_SIZE: 1000000000, // 仓库上限
  BUILD_METAL: 500, // 金属矿
  BUILD_CRISTAL: 500, // 晶体矿
  BUILD_DEUTERIUM: 500 // 重氢

  //速度设置
}

const game_configs = {
  game_speed: 2500
}

const game_config = deepFreeze(game_configs)
export {
  game_config
}