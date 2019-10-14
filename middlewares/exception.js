const { HttpException, Success } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        handleError(ctx, error)
    }
}

function handleError(ctx, error) {
    const isHttpException = error instanceof HttpException
    const isSuccess = error instanceof Success
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
        throw error // 在开发环境，直接抛出未知异常
    }
    if (isSuccess) {
        ctx.body = {
            data: error.data,
            msg: error.msg,
            error_code: error.errorCode,
        }
        ctx.status = error.code
    }
    else if (isHttpException) {
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
        ctx.status = 500
    }
}

module.exports = catchError