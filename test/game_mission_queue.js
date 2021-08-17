import { sequelize, DataTypes, Model } from '../../lib/sequelize.js'

class gameMissionQueue extends Model {}
gameMissionQueue.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    missionType: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "殖民 colony\n探测 spy\n派遣 dispatch\n运输 transport\n攻击 attack\n协防 help\n回收 recycle\n探险 explore"
    },
    missionCode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "任务代码00001"
    },
    missionName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "殖民 colony\n探测 spy\n派遣 dispatch\n运输 transport\n攻击 attack\n协防 help\n回收 recycle\n探险 explore"
    },
    missionStatus: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "start stay back"
    },
    targetUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "目标用户id"
    },
    targetPlanetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "目标球ID"
    },
    targetGalaxy: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "目标坐标 2:2:3"
    },
    seconds: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "到达时间"
    },
    staySeconds: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "停留时间"
    },
    startTime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "出发时间"
    },
    backTime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "返回时间"
    },
    updateTime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    createTime: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'game_mission_queue',
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

export { gameMissionQueue }
