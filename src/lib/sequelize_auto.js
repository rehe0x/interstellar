import { SequelizeAuto } from './sequelize-auto/index.js'

import { Config } from '../../config/index.js'

const args = process.argv.splice(2)

const options = {
  host: Config.mysqlConfig.host,
  port: Config.mysqlConfig.port,
  dialect: 'mysql',
  directory: 'test', // 指定输出 models 文件的目录
  additional: {
    timestamps: false
  },
  caseModel: 'c',
  caseFile: 'C',
  noWrite: false,
  lang: 'es6',
  noInitModels: true,
  tables: (args && args.length > 0) ? args : ['role']
}

const auto = new SequelizeAuto(Config.mysqlConfig.database, Config.mysqlConfig.user,
  Config.mysqlConfig.password, options)

auto.run(err => {
  if (err) throw err
})
