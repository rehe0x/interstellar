
import { Config } from '../../config/index.js'
import Sequelizes from 'sequelize'
import cls from 'cls-hooked'
const { Sequelize, DataTypes, Model } = Sequelizes

const options = {
  dialect: 'mysql', // 数据库类型
  host: Config.mysqlConfig.host, // 主机地址
  port: Config.mysqlConfig.port,
  username: Config.mysqlConfig.user,
  password: Config.mysqlConfig.password,
  database: Config.mysqlConfig.database,
  pool: { // 连接池设置
    max: 5, // 最大连接数
    idle: 30000,
    acquire: 60000
  },
  dialectOptions: {
    charset: 'utf8mb4'
  },
  define: { // 模型设置
    freezeTableName: true, // 自定义表面，不设置会自动将表名转为复数形式
    timestamps: false // 自动生成更新时间、创建时间字段：updatedAt,createdAt
  },
  query: { raw: true }
}
const transaction = cls.createNamespace('transaction')
Sequelize.useCLS(transaction)
const sequelize = new Sequelize(options)

sequelize.authenticate().then(() => {
  console.log('数据库已连接！')
}).catch(err => {
  console.log(err)
  console.log('连接失败')
})

export {
  sequelize,
  DataTypes,
  Model,
  transaction
}
