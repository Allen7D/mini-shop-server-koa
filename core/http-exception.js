// [常见的HTTP状态码](https://www.jianshu.com/p/369db1ba04ea)
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.code = code // HTTP StatusCode 
        this.msg = msg
        this.errorCode = errorCode
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException {
    constructor(data, errorCode, msg, code) {
        super()
        this.data = data || undefined
        this.errorCode = errorCode || 0
        switch (errorCode) {
            case 1:
                this.code = 201
                this.msg = msg || '创建 | 更新成功'
                break
            case 2:
                this.code = 202 // 代替204
                this.msg = msg || '删除成功'
                break
            default:
                this.code = code || 200
                this.msg = msg || '请求成功'
        }
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

// 登录失败(等同于)
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}


module.exports = {
    HttpException,
    ParameterException, // 参数错误
    Success, // 请求成功
    NotFound, // 资源未找到
    AuthFailed, // 授权失败
    Forbbiden, // 禁止访问
}