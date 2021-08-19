import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'
import { SQLUtil } from '../../lib/sql_util.js'

class UserDao extends Model {
  static async findById (userId) {
    return await UserDao.findOne({ where: { id: userId } })
  }

  static async findOneByUPhone ({ universeId, phone }) {
    return await UserDao.findOne({ where: { universeId, phone } })
  }

  static async insert ({ universeId, allianceId, username, phone, status, enabled, createTime }) {
    return await this.create({ universeId, allianceId, username, phone, status, enabled, createTime })
  }

  static async updateUserPlanetId ({ userId, planetId, updateTime }) {
    return await this.update({ planetId, updateTime }, { where: { id: userId } })
  }

  static async updateIncrementPoints ({ userId, points, updateTime }) {
    const rest = await sequelize.query(`update game_user set ${SQLUtil.incrementJoin({ points })}, updateTime = :updateTime where id = :userId`, {
      replacements: { userId, updateTime }
    })
    return rest
  }
}
UserDao.init({
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
  planetId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  allianceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  nickname: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  updateTime: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '修改时间'
  },
  createTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '创建时间'
  }
}, {
  sequelize,
  tableName: 'game_user',
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

export { UserDao }
