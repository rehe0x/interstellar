import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class role extends Model {}
role.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'role',
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

export { role }
