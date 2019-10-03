const Router = require('koa-router')
const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/v1/classic'
})

router.get('/:id/latest', (ctx, next) => {
    // const path = ctx.params // 路由参数
    // // 上下文请求头、上下文请求query参数、上下文请求体
    // const { headers, query, body }  = ctx.request
    // if (true) {
    //     // global.errs.ParameterException() 等同 ParameterException
    //     const error = new ParameterException()
    //     throw error
    // }
    const validator = new PositiveIntegerValidator().validate(ctx)
    // const { id } = ctx.params
    const id = validator.get('path.id')
    ctx.body = {
        key: 'classic' + id
    }
})

module.exports = router