const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/v1/user'
})

// 注册 新增数据

router.post('/register', async (ctx, next) => {
  const validator = new RegisterValidator().validate(ctx)
  const { email, nickname, password1, password2 } = validator.get('body')
  ctx.body = {
    email,
    nickname
  }
})


module.exports = router