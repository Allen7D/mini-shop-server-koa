const Router = require('koa-router')
const { User: UserModel } = require('../../models/user')
const { RegisterValidator } = require('../../validators/validator')
const { auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/user'
})

// 注册(新增用户)
router.post('register', '/register', async (ctx, next) => {
  const validator = await new RegisterValidator().validate(ctx)
  const { email, nickname, password1: password } = validator.get('body')
  const user = {
    email,
    nickname,
    password
  }
  await UserModel.create(user)
  
  throw new global.errs.Success()
})

module.exports = router