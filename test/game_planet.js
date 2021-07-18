import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class gamePlanet extends Model {}
gamePlanet.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    universe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    building_metal_mine: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "金属矿等级"
    },
    building_robot_factory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    building_nano_factory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rpg_constructeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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

export { gamePlanet }
