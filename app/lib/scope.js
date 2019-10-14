class Scope {
  constructor() {
    this.allowApi = []
    this.allowModule = []
    this.forbidden = []
  }
}

class UserScope extends Scope {
  constructor() {
    super()
    this.allowApi = ['v1.classic+getLatest']
    this.allowModule = []
    this.forbidden = []
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
  const prefix = endpoint.split('+')[0]
  if (scope.forbidden.includes(endpoint)) return false
  if (scope.allowApi.includes(endpoint)) return true
  if (scope.allowModule.includes(prefix)) return true
  return false
}

module.exports = {
  isInScope
}
