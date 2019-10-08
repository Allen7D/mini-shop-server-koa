const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')

class User extends Model{
  static async verifyByEmail(email, password) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) throw new global.errs.AuthFailed('用户不存在')
    if (!user.checkPassword(password)) throw new global.errs.AuthFailed('密码不正确')
    return user
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
    unique: true
  }
}, {
  sequelize,
  tableName: 'user' // 自定义表名
})

module.exports = {
  User
}