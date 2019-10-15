module.exports = {
    environment: 'dev', // 'prod'
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '159951'
    },
    security: {
        secretKey: 'But you, Lord , are a shield around me, my glory, the One who lifts my head high.',
        expiresIn: 60 * 60 * 24 * 30 // 60秒 * 60 * 24 * 30 = 1个月
    },
    wx: {
        appID: 'wx551ff8259cd7339b',
        appSecret: '7773e41929841faf6aa9e68807f6e2cb',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}