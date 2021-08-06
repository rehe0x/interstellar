import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import { Cache } from './cache.js'
import { BusinessError } from './error.js'

dayjs.extend(duration)

export const genRandom = (min, max) => Math.floor((Math.random() * ((max - min) + 1) || 0) + min)

export const deepFreeze = (obj) => {
  for (const key in obj) {
    const v = obj[key]
    if (v && typeof v === 'object') {
      deepFreeze(v)
    }
  }
  return Object.freeze(obj)
}

export const remainingTime = (seconds) => {
  const mo = dayjs.duration(seconds, 'seconds')
  if (mo.days() === 0) {
    return `${mo.hours()}h ${mo.minutes()}m ${mo.seconds()}s`
  } else {
    return `${mo.days()}d ${mo.hours()}h ${mo.minutes()}m ${mo.seconds()}s`
  }
}

export const wait = (seconds) => new Promise((resolve, reject) => { setTimeout(() => { resolve('ok') }, seconds) })

export const getLock = async (key, func) => {
  console.log('cache=======', Cache.get(key))
  if (!Cache.get(key)) {
    Cache.put(key, key)
    try {
      return await func()
    } catch (error) {
      throw new BusinessError(error.message)
    } finally {
      Cache.del(key)
    }
  } else {
    return {}
  }
}
