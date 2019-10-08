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

module.exports = {
  ClientTypeEnum
}