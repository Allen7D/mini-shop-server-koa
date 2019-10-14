const bcrypt = require('bcryptjs')
const { Sequelize } = require('sequelize')

const { sequelize, BaseModel } = require('../../core/db')
const { ScopeEnum } = require('../lib/enum')
const { generateToken } = require('../../core/util')

class User extends BaseModel {
  static async verifyByEmail(email, password) {
    const user = await User.findOneOr404({
      where: {
        email
      }
    }, new global.errs.AuthFailed('用户不存在'))

    if (!user.checkPassword(password)) throw new global.errs.AuthFailed('密码不正确')
    const token = generateToken(user.id, user.scope)
    return token
  }
  // auth对应的权限scope
  get scope() {
    return ScopeEnum[this.auth]
  }

  static async verifyByWx(code, ...args) {
    return {}
  }

  checkPassword(raw) {
    return bcrypt.compareSync(raw, this.password)
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 设置主键
    autoIncrement: true, // 自增加
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10) // 10表示生成密码的成本
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },
  auth: {
    type: Sequelize.INTEGER,
    defaultValue: 1, // 1为user(普通用户)， 2为admin(普通管理员)， 3为super(超级管理员)
  },
}, {
  sequelize,
  tableName: 'user' // 自定义表名
})

module.exports = {
  User
}