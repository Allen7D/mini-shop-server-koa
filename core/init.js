const requireDirectory = require('require-directory')
const parser = require('koa-bodyparser')
const Router = require('koa-router')
const catchError = require('../middlewares/exception')

class InitManager {
    static initCore(app) {
        // 静态方法中，this 是 InitManager; app 是Koa实例, 成为类属性
        this.app = app
        /** 入口方法
         *  第1步，连接数据库
         *  第2步，添加「body(上下文请求体)解析」功能
         *  第3步，载入config配置项
         *  第4步，全局载入异常，可以用global.errs
         *  第5步，Koa实例添加路由
         * */
        this.connectDB()
        this.app.use(parser())
        this.loadConfig()
        this.loadHttpException()
        this.initLoadRouters()
    }

    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`
        global.config = require(configPath)
    }

    static initLoadRouters() {
        const routerPath = `${process.cwd()}/app/api`
        const loadModule = (obj) => {
            if (obj instanceof Router) {
                this.app.use(obj.routes())
            }
        }
        requireDirectory(module, routerPath, {
            visit: loadModule
        })
    }

    static loadHttpException() {
        const errors = require('./http-exception') // 所有自定义异常
        global.errs = errors

        this.app.use(catchError)
    }

    static connectDB() {
        require(`${process.cwd()}/app/models/user`)
    }
}

module.exports = InitManager
