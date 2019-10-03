const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model{

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 设置主键
    autoIncrement: true, // 自增加
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user' // 自定义表名
})

module.exports = {
  User
}