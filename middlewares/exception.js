const { HttpException } = require('../core/http-exception')

const catchError = async(ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if(isDev && !isHttpException) {
            throw error // 在开发环境，直接抛出未知异常
        }

        if(isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            // 所有自定义之外的异常，都是服务端异常
            ctx.body = {
                msg: '服务端异常',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 5000
        }
    }
}

module.exports = catchError