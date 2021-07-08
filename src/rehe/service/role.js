const roleDao = require('../dao/role')
class RoleService {
  static async find () {
    const rest = await roleDao.findAll()
    return rest
  }

  static async add () {
    const rest = await roleDao.create({
      code: 'fff',
      name: 'sggg'
    })
    return rest
  }
}

module.exports = RoleService
