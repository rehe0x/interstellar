import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class UserDao extends Model {
  static async findOneByUPhone ({ universeId, phone }) {
    return await UserDao.findOne({ where: { universeId, phone } })
  }

  static async insert ({ universeId, phone, username, allianceId }) {
    return await this.create({ universeId, phone, username, allianceId })
  }

  static async updateUserPlanetId ({ userId, planetId }) {
    return await this.update({ planetId: planetId }, { where: { id: userId } })
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
  avatarPath: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true
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
