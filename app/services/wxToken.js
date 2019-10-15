const util = require('util')
const axios = require('axios')
const { User: UserModel } = require('../models/user')
const { generateToken } = require('../../core/util')
const { appID, appSecret, loginUrl } = global.config.wx

class WxToken {
  constructor(code) {
    this.code = code
    this.loginUrl = util.format(loginUrl, appID, appSecret, this.code)
  }

  async getOpenid() {
    const result = await axios.get(this.loginUrl)
    return this.parseOutOpenid(result)
  }

  parseOutOpenid(result) {
    if (result.status !== 200) throw new global.errs.AuthFailed('openid获取失败')
    const { errcode, openid } = result.data
    if (errcode !== 0) throw new global.errs.AuthFailed('openid获取失败: code无效')
    
    return openid
  }
}

module.exports = {
  WxToken
}