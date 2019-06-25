const Router = require('koa-router')
const { ParameterException } = require('../../../core/http-exception')
const router = new Router({
    prefix: '/v1/classic'
})

router.get('/:id/latest', (ctx, next) => {
    if (true) {
        // global.errs.ParameterException() 等同 ParameterException
        const error = new ParameterException()
        throw error
    }
    ctx.body = {
        key: 'classic' + ctx.params.id
    }
})

module.exports = router