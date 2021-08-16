import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class BuildQueueDao extends Model {
  static async insert ({
    userId, planetId, buildCode, buildName, level, remainLevel, metal, crystal
    , deuterium, energy, buildType, status, seconds, startTime, endTime, remainUpdateTime
    , updateTime, createTime
  }) {
    return await BuildQueueDao.create({
      userId,
      planetId,
      buildCode,
      buildName,
      level,
      remainLevel,
      metal,
      crystal,
      deuterium,
      energy,
      buildType,
      status,
      seconds,
      startTime,
      endTime,
      remainUpdateTime,
      updateTime,
      createTime
    })
  }

  static async findById (queueId) {
    return await this.findByPk(queueId)
  }

  static async findByItem ({ userId, planetId, buildType }) {
    const whereClause = {
      userId
    }
    if (planetId) whereClause.planetId = planetId
    if (buildType) whereClause.buildType = buildType
    return await this.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    })
  }

  static async findPlanetByType ({ userId, planetId, buildType }) {
    return await this.findAll({
      where: { userId, planetId, buildType }
    })
  }

  static async findOneUserByType ({ userId, buildType }) {
    return await this.findOne({
      where: { userId, buildType }
    })
  }

  static async findPlanetByTypeStatus ({ userId, planetId, buildType, status }) {
    return await this.findAll({
      where: { userId, planetId, buildType, status }
    })
  }

  static async findOnePlanetByTypeIdAsc ({ userId, planetId, buildType }) {
    return await this.findOne({
      where: { userId, planetId, buildType },
      order: [['id', 'ASC']]
    })
  }

  static async findByBuildType (buildType) {
    return await this.findAll({
      where: { buildType }
    })
  }

  static async findByBuildTypeGroup (buildType) {
    const rest = await sequelize.query(`select mm.* from game_build_queue mm, (
      select min(gbq.id) gid from game_build_queue gbq where gbq.buildType = :buildType group by gbq.planetId) gg
      where mm.id = gg.gid`, {
      replacements: { buildType },
      model: BuildQueueDao
    })
    return rest
  }

  static async updateRemain ({ remainLevel, remainUpdateTime, updateTime }, { queueId }) {
    return await this.update({ remainLevel, remainUpdateTime, updateTime }, {
      where: { id: queueId }
    })
  }

  static async updateBuildQueueRun ({ status, seconds, startTime, endTime, remainUpdateTime, updateTime }, { queueId }) {
    return await this.update({
      status, seconds, startTime, endTime, remainUpdateTime, updateTime
    }, {
      where: { id: queueId }
    })
  }

  static async deleteById (queueId) {
    return await this.destroy({ where: { id: queueId } })
  }

  static async deleteByPlanetId ({ planetId, status }) {
    return await this.destroy({ where: { planetId, status } })
  }

  static async deleteLatterByType ({ planetId, buildType, time }) {
    await sequelize.query('delete gbq from game_build_queue gbq where gbq.planetId = :planetId and gbq.buildType = :buildType and gbq.createTime >= :time ', {
      replacements: { planetId, buildType, time }
    })
  }

  static async insertLog ({ title, text, time }) {
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
  remainLevel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '剩余'
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
  remainUpdateTime: {
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
