/**
 * 中文简要教程 https://itbilu.com/nodejs/npm/VkYIaRPz-.html
 */
const Sequelize = require('sequelize')
const {
  database: {
    dbName,
    host,
    port,
    user,
    password
  }
} = require('../config/config')

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,  // 打印ORM所执行的SQL语句
  timezone: '+08:00', // 设置时区
  define: {
    // create_time, update_time, delete_time
    timestamps: true,
    paranoid: true, // 增加deletedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // snake
  }
})

sequelize.sync({
  // force: true // 强制删除 & 重建表
})

module.exports = {
  sequelize
}