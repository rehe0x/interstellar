import { sequelize, DataTypes, Model, QueryTypes } from '../../lib/sequelize.js'

class MissionDetailDao extends Model {
  static async insert ({
    universeId, missionId, userId, planetId, planetType, galaxy, speed, fleets, fleetSpeed
    , consumption, capacity, resources, createTime
  }) {
    return await this.create({
      universeId, missionId, userId, planetId, planetType, galaxy, speed, fleets, fleetSpeed, consumption, capacity, resources, createTime
    })
  }

  static async findByUserId (userId) {
    const sqlStr = `select 
        gmd.*,
        gmq.missionType,
        gmq.missionName,
        gmq.missionStatus,
        gmq.targetUserId,
        gmq.targetPlanetId,
        gmq.targetPlanetType,
        gmq.targetGalaxy,
        gmq.seconds,
        gmq.staySeconds,
        gmq.startTime,
        gmq.backTime 
        from game_mission_detail gmd 
        inner join game_mission_queue gmq on gmd.missionId = gmq.id
        where gmd.userId = :userId`
    const rest = await sequelize.query(sqlStr, {
      replacements: { userId },
      type: QueryTypes.SELECT
    })
    return rest
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
  planetType: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '类型'
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
