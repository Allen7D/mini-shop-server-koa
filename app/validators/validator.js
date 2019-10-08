const { BaseValidator, Rule } = require('../../core/base-validator')
const { User: UserModel } = require('../models/user')
const { ClientTypeEnum } = require('../lib/enum')

class PositiveIntegerValidator extends BaseValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

class RegisterValidator extends BaseValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', { 
        min: 6, 
        max: 32 
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
  }

  validatePassword(vals) {
    const { password1: psw1, password2: psw2 } = vals.body
    if (psw1 !== psw2) throw new Error('两个密码必须相同') 
  }

  async validateEmail(vals) {
    const { email }  = vals.body
    const user = await UserModel.findOne({
      where: {
        email
      }
    })
    if (user) throw new Error('email 已存在')
  }
}

class TokenValidator extends BaseValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4, 
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateType(vals) {
    const { type } = vals.body
    if (!type) throw new Error('type是必填参数')
    if (!ClientTypeEnum.isThisType(type)) throw new Error('type参数不合法')
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
}