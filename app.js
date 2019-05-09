const chalk = require('chalk')
const Koa = require('koa')
const InitManager = require('./core/init')
const app = new Koa()

InitManager.initCore(app)

app.listen(3010, () => {
    console.log(chalk.yellow('服务器正常启动运行 >>  localhost:3010'))
})
