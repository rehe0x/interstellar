import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class UserDao extends Model {
  static async findPage () {
    const rest = await sequelize.query('select * from user')
    return rest
  }

  static async updateUser (field, whereClause) {
    return await this.update(field, {
      where: whereClause
    })
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
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
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
    allowNull: true
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
  tableName: 'user',
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
