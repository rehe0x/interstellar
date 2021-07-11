
import { config } from '../../config/index.js'
import _Sequelize from 'sequelize'
const { Sequelize, DataTypes, Model } = _Sequelize

const options = {
  dialect: 'mysql', // 数据库类型
  host: config.mysql_config.host, // 主机地址
  port: config.mysql_config.port,
  pool: { // 连接池设置
    max: 5, // 最大连接数
    idle: 30000,
    acquire: 60000
  },
  dialectOptions: {
    charset: 'utf8mb4' // 字符集
    // collate: 'utf8mb4_general_ci'
  },
  define: { // 模型设置
    freezeTableName: true, // 自定义表面，不设置会自动将表名转为复数形式
    timestamps: false // 自动生成更新时间、创建时间字段：updatedAt,createdAt
  },
  query: { raw: true },
  timezone: '+08:00'
}
const sequelize = new Sequelize(config.mysql_config.database, config.mysql_config.user,
  config.mysql_config.password, options)

sequelize.authenticate().then(() => {
  console.log('数据库已连接！')
}).catch(err => {
  console.log(err)
  console.log('连接失败')
})

export {
  sequelize,
  DataTypes,
  Model
}
