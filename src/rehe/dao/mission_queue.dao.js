import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class MissionQueueDao extends Model {
  static async insert ({
    universeId, userId, missionCode, missionType, missionName, missionStatus, targetUserId, targetPlanetId,
    targetPlanetName, targetPlanetType, targetGalaxy, distance, maxSpeed, seconds, staySeconds, startTime, createTime
  }) {
    return await this.create({
      universeId,
      userId,
      missionCode,
      missionType,
      missionName,
      missionStatus,
      targetUserId,
      targetPlanetId,
      targetPlanetName,
      targetPlanetType,
      targetGalaxy,
      distance,
      maxSpeed,
      seconds,
      staySeconds,
      startTime,
      createTime
    })
  }
}
MissionQueueDao.init({
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  missionCode: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '任务代码00001'
  },
  missionType: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '殖民 colony\n探测 spy\n派遣 dispatch\n运输 transport\n攻击 attack\n协防 help\n回收 recycle\n探险 explore\r\n导弹攻击jdam'
  },
  missionName: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '殖民 colony\n探测 spy\n派遣 dispatch\n运输 transport\n攻击 attack\n协防 help\n回收 recycle\n探险 explore\r\n导弹攻击jdam'
  },
  missionStatus: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: 'start stay back'
  },
  targetUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '目标用户id'
  },
  targetPlanetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '目标球ID'
  },
  targetPlanetName: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '目标名称'
  },
  targetPlanetType: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '目标类型'
  },
  targetGalaxy: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '目标坐标 2:2:3'
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '距离'
  },
  maxSpeed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '最大速度'
  },
  seconds: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '单程时间'
  },
  staySeconds: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    comment: '停留时间'
  },
  startTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '出发时间'
  },
  backTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    comment: '返回时间'
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
  tableName: 'game_mission_queue',
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

export { MissionQueueDao }
