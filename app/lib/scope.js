class Scope {
  constructor() {
    this.allow_api = []
    this.allow_module = []
    this.forbidden = []
  }
}

class UserScope extends Scope {
  constructor() {
    super()
    this.allow_api = ['v1.classic+getLatest']
    this.allow_module = []
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
  if (scope.allow_api.includes(endpoint)) return true
  if (scope.allow_module.includes(prefix)) return true
  return false
}

module.exports = {
  isInScope
}
