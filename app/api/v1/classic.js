const Router = require('koa-router')
const { ParameterException } = require('../../../core/http-exception')
const router = new Router({
    prefix: '/v1/classic'
})

router.get('/v1/classic/:id/latest', (ctx, next) => {
    if (true) {
        // global.errs.ParameterException() 等同 ParameterException
        const error = new ParameterException()
        throw error
    }
    ctx.body = {
        key: 'classic'
    }
})

module.exports = router