const { BaseValidator, Rule } = require('../../core/base-validator')

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
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) throw new Error('两个密码必须相同') 
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}