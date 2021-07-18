import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class PlanetDao extends Model {
  static async updateLevel(task){
    const rest = await sequelize.query(`update game_planet set ${task.buildCode} = ${task.buildCode}+1 where id = ${task.planetId}`)
    return rest
  }
}
PlanetDao.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    universe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    building_metal_mine: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "金属矿等级"
    },
    building_robot_factory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    building_nano_factory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rpg_constructeur: {
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
    }
  }, {
    sequelize,
    tableName: 'game_planet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

export { PlanetDao }
