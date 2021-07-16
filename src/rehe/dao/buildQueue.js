import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class BuildQueue extends Model {
  static async findOneByOrder (whereClause) {
    return await this.findOne({
      where: whereClause,
      order: [['level', 'DESC']]
    })
  }
}
BuildQueue.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  planetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '星球id'
  },
  buildCode: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '建筑代码'
  },
  buildName: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '建筑名称'
  },
  level: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '等级'
  },
  metal: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '需要金属'
  },
  crystal: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '需要晶体'
  },
  deuterium: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '需要重氦'
  },
  energy: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '需要能量 可以负'
  },
  buildType: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: 'building 基础建筑 research研究建筑 '
  },
  status: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: 'pending 等待 running执行中'
  },
  seconds: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'game_build_queue',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' }
      ]
    },
    {
      name: 'runging_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'planetId' },
        { name: 'buildType' },
        { name: 'status' }
      ]
    }
  ]
})

export { BuildQueue }
