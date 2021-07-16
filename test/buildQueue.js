import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class BuildQueue extends Model {}
BuildQueue.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    planet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "星球id"
    },
    build_code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "建筑代码"
    },
    build_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "建筑名称"
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "等级"
    },
    metal: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "需要金属"
    },
    crystal: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "需要晶体"
    },
    deuterium: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "需要重氦"
    },
    energie: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "需要能量 可以负"
    },
    build_type: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "building 基础建筑 research研究建筑 "
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "pending 等待 running执行中"
    },
    seconds: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'game_build_queue',
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
      {
        name: "runging_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "planet_id" },
          { name: "build_type" },
          { name: "status" },
        ]
      },
    ]
  });

export { BuildQueue }
