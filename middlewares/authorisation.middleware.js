class Authorization {
  roles = ['admin', 'manager', 'player'];

  async canCreateOwn() {
    if (roles.includes(this.req.auth.role)) {
      next()
    }
  }

  async canDeleteAny() {
    if (roles.includes(this.req.auth.role)) {
      next()
    }
  }

  async isAuthorised (req, res, next) {
    this.req = req
    this.res = res
    this.next = next
    this.canCreateOwn()
  }
}

export default new Authorization();
