
class SQLUtil {
  static incrementJoin (item) {
    let sqlStr = ''
    for (const key in item) {
      sqlStr += `\`${key}\` = \`${key}\` + '${item[key]}',`
    }
    return sqlStr.substring(0, sqlStr.length - 1)
  }
}

export {
  SQLUtil
}
