import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class PlanetDao extends Model {
  static async findAllByItem (whereClause) {
    return await this.findAll({
      where: whereClause
    })
  }

  static async updatePlanet (field, whereClause) {
    return await this.update(field, {
      where: whereClause
    })
  }

  static async incrementPlanet (field, whereClause) {
    return await this.increment(field, { where: whereClause })
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
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '星球名称'
  },
  planetType: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '类型 star moon'
  },
  galaxyX: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '坐标x1-9'
  },
  galaxyY: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '坐标y1-499'
  },
  galaxyZ: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '坐标z1-15'
  },
  tempMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '星球最大温度'
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
  },
  createTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '创建时间'
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
