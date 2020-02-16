function isThisType(val) {
  return Object.values(this).includes(val)
}

const ClientTypeEnum = {
	USER_EMAIL:100, // 邮箱登录
	USER_MOBILE: 101, // 手机登录
	// 微信
	USER_WX_MINA: 200, // 微信小程序
	USER_WX_OPEN: 201, 	// 微信第三方登录
	USER_WX: 202, // 微信公众号
  isThisType
}

const ScopeEnum = {
  UserScope: 1, // 普通用户
  1: 'UserScope',
  AdminScope: 2, // 管理员
  2: 'AdminScope',
  SuperScope: 3, // 超级管理员
  3: 'SuperScope',
  isThisType
}

module.exports = {
  ClientTypeEnum,
  ScopeEnum
}