import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class BuildQueueDao extends Model {
  static async findOneByItem (whereClause) {
    return await this.findOne({ where: whereClause })
  }

  static async findOneByOrderLevel (whereClause) {
    return await this.findOne({
      where: whereClause,
      order: [['level', 'DESC']]
    })
  }

  static async findOneByOrderTime (whereClause) {
    return await this.findOne({
      where: whereClause,
      order: [['id', 'ASC']]
    })
  }

  static async findAllByBuildType (buildType) {
    return await this.findAll({
      where: { buildType }
    })
  }

  static async updateBuildQueue (field, whereClause) {
    return await this.update(field, {
      where: whereClause
    })
  }

  static async delete (whereClause) {
    return await this.destroy({ where: whereClause })
  }

  static async insertLog (title, text, time) {
    console.log(time)
    const rest = await sequelize.query('INSERT INTO game_build_log (title, text, createTime)VALUES(:title, :text, :time)', {
      replacements: { title, text, time }
    })
    return rest
  }
}
BuildQueueDao.init({
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
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  endTime: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  updateTime: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  createTime: {
    type: DataTypes.INTEGER.UNSIGNED,
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

export { BuildQueueDao }