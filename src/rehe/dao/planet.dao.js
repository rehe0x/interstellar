import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class PlanetDao extends Model {
  static async updateLevel (code, planetId) {
    const rest = await sequelize.query(`update game_planet set ${code} = ${code}+1 where id = ${planetId}`)
    return rest
  }

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
    allowNull: true
  },
  universe: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  buildingMetalMine: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '金属矿等级'
  },
  buildingRobotFactory: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  buildingNanoFactory: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  rpgConstructeur: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  metal: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  crystal: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  deuterium: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  researchSpyTech: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  buildingLaboratory: {
    type: DataTypes.INTEGER,
    allowNull: true
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
