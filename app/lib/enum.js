function isThisType(val) {
  return Object.values(this).includes(val)
}

const ClientTypeEnum = {
  USER_MINA: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
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