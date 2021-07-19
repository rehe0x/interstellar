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
    buildingMetalMine: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "金属矿等级"
    },
    buildingRobotFactory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    buildingNanoFactory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rpgConstructeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    metal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    crystal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
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
