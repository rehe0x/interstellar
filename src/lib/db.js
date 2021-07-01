/* eslint-disable camelcase */
const config = require('../../config')
const mysql = require('mysql')

const mysqlConfig = {
  host: config.mysql_config.host,
  port: config.mysql_config.port,
  user: config.mysql_config.user,
  password: config.mysql_config.password,
  database: config.mysql_config.database,
  timezone: '08:00'
}

const mysqlPool = mysql.createPool(mysqlConfig)
console.log('初始化======')
const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) reject(err)
      else {
        connection.query(sql, val, (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
          connection.release()
        })
      }
    })
  })
}

const _sql = {
  /** **********************数据库操作相关************************
   * 数据库操作相关 DDL
   *************************************************************/
  // (1) 创建数据库
  CREATE_DB: (dbName) => `CREATE DATABASE IF NOT EXISTS ${dbName};`,
  // (2) 查询所有数据库
  SHOW_ALL_DB: 'SHOW DATABASES',
  // (3) 删除数据库
  DELETE_DB: (dbName) => `DROP DATABASE IF EXISTS ${dbName};`,
  // (4) 查询正在使用的数据库
  SELECT_DATABASE: 'SELECT DATABASE()',
  // (5) 使用数据库
  USE_DB: (dbName) => `USE ${dbName};`,

  /** **********************数据表操作相关************************
   * 数据表操作相关 DDL
   *************************************************************/
  // (1) 查询所有数据表
  SHOW_ALL_TABLE: 'SHOW TABLES',
  // (2) 添加数据表
  CREATE_TABLE: (tableName) =>
    `CREATE TABLE IF NOT EXISTS ${tableName} (id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',created_time TIMESTAMP COMMENT 'created time',updated_time TIMESTAMP COMMENT 'updated time')`,
  // (3) 删除表
  DROP_TABLE: (tableName) => `DROP TABLE IF EXISTS ${tableName};`,
  // (4) 添加字段
  ADD_COLUM: (tableName, column_name, column_type) =>
    `ALTER TABLE ${tableName} ADD ${column_name} ${column_type};`,
  // (5) 删除字段
  DROP_COLUM: (tableName, column_name) =>
    `ALTER TABLE ${tableName} DROP ${column_name};`,
  /** **********************数据操作相关************************
   * 数据操作相关 DML
   *************************************************************/
  // (1) 查询表中所有数据
  QUERY_DATAS: (tableName) => `SELECT * FROM ${tableName}`,
  // (2) 插入数据(全部列)
  INSERT_DATAS: (tableName, values) =>
    `INSERT INTO ${tableName} VALUES (${values});`,
  // (3) 插入数据(部分列)
  INSERT_DATA: (tableName, colums, values) =>
    `INSERT INTO ${tableName}(${colums}) VALUES (${values});`,
  // (4) 删除数据(根据id)
  DELETE_DATA_BY_ID: (tableName, id) =>
    `DELETE FROM ${tableName} WHERE (id = ${id});`,
  // (5) 删除所有数据
  DELETE_DATAS: (tableName) => `DELETE FROM ${tableName};`,
  // (6) 更新数据条目
  UPDATE_DATA: (tableName, id, colum, value) =>
    `UPDATE ${tableName} SET ${colum} = ${value} WHERE id = ${id};`
}

module.exports = { query, _sql }
