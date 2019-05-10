const chalk = require('chalk')
const Koa = require('koa')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
InitManager.initCore(app)

app.listen(3010, () => {
    console.log(chalk.yellow('服务器正常启动运行 >>  localhost:3010'))
})