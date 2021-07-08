const SequelizeAuto = require('./sequelize-auto/auto')

const config = require('../../config')

const args = process.argv.splice(2)

const options = {
  host: config.mysql_config.host,
  port: config.mysql_config.port,
  dialect: 'mysql',
  directory: 'test_models', // 指定输出 models 文件的目录
  additional: {
    timestamps: false
  },
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
