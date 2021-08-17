import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class MissionDetail extends Model {
  static async insert ({
    missionId, userId, planetId, galaxy, speed, fleetList, createTime
  }) {
    this.create({
      missionId, userId, planetId, galaxy, speed, fleetList, createTime
    })
  }
}
MissionDetail.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
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
  fleetList: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: '舰队清单'
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

export { MissionDetail }
