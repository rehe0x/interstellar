import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class PlanetDao extends Model {
  static async updatePlanet (field, whereClause) {
    return await this.update(field, {
      where: whereClause
    })
  }
}
PlanetDao.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  universe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  metal: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '金属资源'
  },
  crystal: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '晶体资源'
  },
  deuterium: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '重氦资源'
  },
  metalPerhour: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '金属产量1小时'
  },
  crystalPerhour: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '晶体产量1小时'
  },
  deuteriumPerhour: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '重氦产量1小时'
  },
  energyUsed: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '已消耗能量1总'
  },
  energyMax: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
    comment: '能量1总'
  },
  resourcesUpdateTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '资源更新时间'
  }
}, {
  sequelize,
  tableName: 'game_planet',
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

export { PlanetDao }
