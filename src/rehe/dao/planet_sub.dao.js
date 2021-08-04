import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class PlanetSubDao extends Model {
  static async updateLevel (code, planetId, level) {
    const rest = await sequelize.query(`update game_planet_sub set ${code} = ${level} where planetId = ${planetId}`)
    return rest
  }

  static async findByPlanet (whereClause) {
    return await this.findOne({
      where: whereClause
    })
  }
}
PlanetSubDao.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  planetId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  universeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  buildingMetalMine: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '金属矿'
  },
  buildingCrystalMine: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '晶体矿'
  },
  buildingDeuteriumSintetizer: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '重氦合成器'
  },
  buildingFusionPlant: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '太阳能电站'
  },
  buildingSolarPlant: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '核电站'
  },
  buildingRobotFactory: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '机器人工厂'
  },
  buildingNanoFactory: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '纳米机器人'
  },
  buildingHangar: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '造船厂'
  },
  buildingMetalStore: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '金属仓库'
  },
  buildingCrystalStore: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '晶体仓库'
  },
  buildingDeuteriumStore: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '重氦仓库'
  },
  buildingLaboratory: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '研究实验室'
  },
  buildingTerraformer: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '地形改造器'
  },
  buildingAllyDeposit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '联盟太空站'
  },
  buildingMondbasis: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '月球基地'
  },
  buildingPhalanx: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '感应证'
  },
  buildingSprungtor: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '空间隧道'
  },
  buildingSilo: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '导弹发射井'
  },
  fleetMetalMine: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '小型运输船'
  },
  fleetBigShipCargo: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '大型运输船'
  },
  fleetLightHunter: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '轻型战斗机'
  },
  fleetHeavyHunter: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '重型战斗机'
  },
  fleetCrusher: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '巡洋舰'
  },
  fleetBattleShip: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '战列舰'
  },
  fleetColonizer: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '殖民船'
  },
  fleetRecycler: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '回收船'
  },
  fleetSpySonde: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '探测器'
  },
  fleetBomberShip: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '轰炸机'
  },
  fleetSolarSatelit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '太阳能卫星'
  },
  fleetDestructor: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '毁灭者'
  },
  fleetDearthStar: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '死星'
  },
  fleetBattleCruiser: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '战斗巡洋舰'
  }
}, {
  sequelize,
  tableName: 'game_planet_sub',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' }
      ]
    }
  ]
})

export { PlanetSubDao }
