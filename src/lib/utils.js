import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import { Cache } from './cache.js'
import { BusinessError } from './error.js'

dayjs.extend(duration)

export const genRandom = (min, max) => Math.floor((Math.random() * ((max - min) + 1) || 0) + min)

export const getRandomChineseWord = (min, max) => {
  const l = genRandom(min, max)
  const rsl = []
  for (let index = 0; index < l; index++) {
    const _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16)
    rsl.push(eval('"\\u' + _randomUniCode + '"'))
  }
  return rsl.join('')
}

export const getRandomString = (min, max) => {
  const l = genRandom(min, max)
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = l; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
  return result
}

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

export const sqlStr = async (item) => {
  let sqlStr = ''
  for (const key in item) {
    sqlStr += `${key} = ${key} + ${item[key]}`
  }
}
