import { Cache } from './cache.js'

export const getLock = async (key, func) => {
  if (!Cache.get(key)) {
    Cache.put(key, key)
    const result = await func()
    Cache.del(key)
    return result
  } else {
    return {}
  }
}
