const Router = require('koa-router')

const { TokenValidator } = require('../../validators/validator')
const { ClientTypeEnum } = require('../../lib/enum')
const { User: UserModel } = require('../../models/user')

const router = new Router({
  prefix: '/v1/token'
})

// 生成「token令牌」
router.post('/', async (ctx, next) => {
  const validator = await new TokenValidator().validate(ctx)
  const { account, secret, type } = validator.get('body')
  const promise = {
    [ClientTypeEnum.USER_EMAIL]: UserModel.verifyByEmail, // 邮箱&密码登录
    [ClientTypeEnum.USER_WX]: UserModel.verifyByWx, // 微信小程序登录
  }
  const token = await promise[type](account, secret)
  throw new global.errs.Success({token})
})

module.exports = router