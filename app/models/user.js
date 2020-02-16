const bcrypt = require('bcryptjs')
const { Sequelize } = require('sequelize')

const { sequelize, BaseModel } = require('../../core/db')
const { ScopeEnum } = require('../lib/enum')
const { generateToken } = require('../../core/util')
const { WxToken } = require('../services/wxToken')

class User extends BaseModel {
  static async verifyByEmail(email, password) {
    const user = await User.findOneOr404({
      where: {
        email
      }
    }, new global.errs.AuthFailed('用户不存在'))

    user.checkPassword(password)
    return user.token
  }
  // auth对应的权限scope
  get scope() {
    return ScopeEnum[this.auth]
  }

  get token() {
    return generateToken(this.id, this.scope)
  }

  static async verifyByWxMina(code, ...args) {
    const wt = new WxToken(code)
    const openid = await wt.getOpenid()
    // 是否已注册
    let user = await User.findOne({
      where: {
        openid
      }
    })
    // 未找到用户，则新增用户
    if (!user) user = await User.create({ openid })
    return user.token
  }

  checkPassword(raw) {
    const result = bcrypt.compareSync(raw, this.password)
    if (!result) throw new global.errs.AuthFailed('密码不正确')
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