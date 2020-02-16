class Scope {
  constructor() {
    this.allowApi = []
    this.allowModule = []
    this.forbiddenApi = []
    this.forbiddenModule = []
  }
}

class UserScope extends Scope {
  constructor() {
    super()
    this.allowApi = ['v1.classic+getLatest']
    this.allowModule = []
    this.forbiddenApi = []
    this.forbiddenModule = []
  }
}

class AdminScope extends Scope {
  constructor() {
    super()

  }
}

class SuperScope extends Scope {
  constructor() {
    super()

  }
}

const matchScope = {
  UserScope,
  AdminScope,
  SuperScope
}

function isInScope(scopeName, endpoint) {
  const scope = new matchScope[scopeName]()
  const apiPrefix = endpoint.split('+')[0] // v1.classic
  if (scope.forbiddenApi.includes(endpoint)) return false
  if (scope.allowApi.includes(endpoint)) return true
  if (scope.allowModule.includes(apiPrefix)) return true
  return false
}

module.exports = {
  isInScope
}
