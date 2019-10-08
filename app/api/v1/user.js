const Router = require('koa-router')
const { User: UserModel } = require('../../models/user')
const { RegisterValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/v1/user'
})

// 注册 新增数据

router.post('/register', async (ctx, next) => {
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