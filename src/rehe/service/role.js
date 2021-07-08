const roleDao = require('../dao/role')
class RoleService {
  async find () {
    const rest = await roleDao.findAll()
    return rest
  }

  async add () {
    const rest = await roleDao.create({
      code: 'fff',
      name: 'sggg'
    })
    return rest
  }
}

module.exports = new RoleService()
