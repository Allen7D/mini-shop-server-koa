module.exports = {
    environment:'dev', // 'prod'
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '159951'
    },
    security: {
        secretKey: 'But you, Lord , are a shield around me, my glory, the One who lifts my head high.',
        expiresIn: 60*60*24*30 // 60秒 * 60 * 24 * 30 = 1个月
    }
}