const jwt = require('jsonwebtoken')
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

const generateToken = function (uid, scope) {
    const { secretKey, expiresIn } = global.config.security
    const token = jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn
    })
    return token
}

const verifyToken = function (token) {
    const { secretKey } = global.config.security
    let errMsg = 'token 不合法'
    try {
        // 用户ID, 用户权限, 创建时间, 有效期
        var { uid, scope, iat: create_at, exp: expire_in } = jwt.verify(token, secretKey)
    } catch (error) {
        // token 不合法
        if (error.name === 'JsonWebTokenError') errMsg = 'token 不合法'
        // token 过期
        if (error.name === 'TokenExpiredError') errMsg = 'token 过期'
        // token 为空
        if (token === '') errMsg = 'token 为空'
        // 统一抛出
        throw new global.errs.Forbbiden(errMsg)
    }
    return { uid, scope, create_at, expire_in } 
}


module.exports = {
    findMembers,
    generateToken,
    verifyToken
}
