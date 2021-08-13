import { sequelize, DataTypes, Model, QueryTypes } from '../../lib/sequelize.js'

class PlanetDao extends Model {
  static async insert ({
    userId, universeId, name, planetType, galaxyX, galaxyY, galaxyZ
    , tempMini, tempMax, sizeMax, metal, crystal, deuterium, resourcesUpdateTime, createTime
  }) {
    return await this.create({
      userId,
      universeId,
      name,
      planetType,
      galaxyX,
      galaxyY,
      galaxyZ,
      tempMini,
      tempMax,
      sizeMax,
      metal,
      crystal,
      deuterium,
      resourcesUpdateTime,
      createTime
    })
  }

  static async findById (planetId) {
    return await PlanetDao.findByPk(planetId)
  }

  static async findByUserId ({ userId }) {
    return await this.findAll({ where: { userId } })
  }

  static async findByGalaxy ({ universeId, planetType, galaxyX, galaxyY, galaxyZ }) {
    const whereClause = {
      universeId,
      galaxyX,
      galaxyY,
      galaxyZ
    }
    if (planetType) whereClause.planetType = planetType
    return await this.findAll({ where: whereClause })
  }

  static async findStaratlas ({ universeId, galaxyX, galaxyY }) {
    const sqlStr = `select 
                    gp.id planetId,
                    gp.name planetName,
                    gp.planetType,
                    gp.galaxyX,
                    gp.galaxyY,
                    gp.galaxyZ,
                    gp.ruins,
                    gu.id userId,
                    gu.username,
                    gu.nickname,
                    ga.id allianceId,
                    ga.name allianceName
                    from game_planet gp
                    inner join game_user gu on gp.userId = gu.id
                    left join game_alliance ga on gu.allianceId = ga.id
                    where gp.universeId = :universeId and gp.galaxyX = :galaxyX and gp.galaxyY = :galaxyY`
    const rest = await sequelize.query(sqlStr, {
      replacements: { universeId, galaxyX, galaxyY },
      type: QueryTypes.SELECT
    })
    return rest
  }

  static async updateTimeResources ({
    metal, crystal, deuterium, metalPerhour, crystalPerhour
    , deuteriumPerhour, energyUsed, energyMax, resourcesUpdateTime
  }, { planetId }) {
    return await this.update({
      metal,
      crystal,
      deuterium,
      metalPerhour,
      crystalPerhour,
      deuteriumPerhour,
      energyUsed,
      energyMax,
      resourcesUpdateTime
    }, {
      where: {
        id: planetId
      }
    })
  }

  static async incrementResources ({ metal, crystal, deuterium }, { planetId }) {
    return await this.increment({ metal, crystal, deuterium }, { where: { id: planetId } })
  }

  static async incrementSzie ({ metal, crystal, deuterium }, { planetId }) {
    return await this.increment({ metal, crystal, deuterium }, { where: { id: planetId } })
  }

  static async incrementPlanet ({ sizeUsed }, { planetId }) {
    return await this.increment({ sizeUsed }, { where: { id: planetId } })
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
  universeId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  sizeMax: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '星球大小'
  },
  sizeUsed: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    comment: '已使用大小'
  },
  ruins: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '废墟'
  },
  resourcesUpdateTime: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '资源更新时间'
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
