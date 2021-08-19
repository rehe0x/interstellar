import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class MissionDetailDao extends Model {
  static async insert ({
    universeId, missionId, userId, planetId, galaxy, speed, fleets, fleetSpeed
    , consumption, capacity, resources, createTime
  }) {
    return await this.create({
      universeId, missionId, userId, planetId, galaxy, speed, fleets, fleetSpeed, consumption, capacity, resources, createTime
    })
  }
}
MissionDetailDao.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  universeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  missionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  planetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '星球id'
  },
  galaxy: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '坐标1:2:4'
  },
  speed: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '速度'
  },
  fleets: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: '舰队清单'
  },
  fleetSpeed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '舰队速度'
  },
  consumption: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '消耗'
  },
  capacity: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '承载量'
  },
  resources: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '装了多少资源'
  },
  updateTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  createTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'game_mission_detail',
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

export { MissionDetailDao }
