const Router = require('koa-router')
const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/classic'
})

router.get('getLatest', '/:id/latest', auth().verify, async (ctx, next) => {
    // const path = ctx.params // 路由参数
    // // 上下文请求头、上下文请求query参数、上下文请求体
    // const { headers, query, body }  = ctx.request
    // if (true) {
    //     // global.errs.ParameterException() 等同 ParameterException
    //     const error = new ParameterException()
    //     throw error
    // }
    const validator = await new PositiveIntegerValidator().validate(ctx)
    const { id } = validator.get('path')
    throw new global.errs.Success({
        userId: ctx.auth.uid
    })
})

module.exports = router