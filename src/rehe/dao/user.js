const { query, _sql } = require('../../lib/db')

exports.test = async () => {
  const rest = await query(_sql.QUERY_DATAS('user'))
  return rest
}

exports.add = async () => {
  const rest = await query(_sql.INSERT_DATA('role', 'code,name', '"fff",123'))
  return rest
}
