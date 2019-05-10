const requireDirectory= require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // 入口方法
        // app 是类属性
        this.app = app // 静态方法中，this 是 InitManager
        this.loadConfig()
        this.initLoadRouters()
        this.loadHttpException()
    }

    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        const routerPath = `${process.cwd()}/app/api`
        requireDirectory(module, routerPath, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException() {
        const errors = require('./http-exception') // 所有自定义异常
        global.errs = errors
    }
}

module.exports = InitManager