import { SequelizeAuto } from './sequelize-auto/index.js'

import { config } from '../../config/index.js'

const args = process.argv.splice(2)

const options = {
  host: config.mysql_config.host,
  port: config.mysql_config.port,
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

const auto = new SequelizeAuto(config.mysql_config.database, config.mysql_config.user,
  config.mysql_config.password, options)

auto.run(err => {
  if (err) throw err
})
