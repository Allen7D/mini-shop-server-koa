const basicAuth = require('basic-auth')
const { verifyToken } = require('../core/util')
const { isInScope } = require('../app/lib/scope')

class Auth {
  // 设置属性
  get verify() {
    return async (ctx, next) => {
      // 如何判断「公开API」和「非公开API」
      this.ctx = ctx
      const { endpoint } = this
      const { name: token, pass } = basicAuth(ctx.req) // 解析
      const { uid, scope } = verifyToken(token)
      if (!isInScope(scope, endpoint)) throw new global.errs.Forbbiden('权限不足')
      // 可传递给后续用
      ctx.auth = { uid, scope }
      await next()
    }
  }

  get endpoint() {
    let [, routerVersion, routerCategory,] = this.ctx.url.split('/')
    let { routerName } = this.ctx
    return `${routerVersion}.${routerCategory}+${routerName}`
  }
}

module.exports = {
  auth: () => {
    return new Auth()
  }
}