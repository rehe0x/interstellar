import moment from 'moment'

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
  const mo = moment.duration(seconds, 'seconds')
  if (mo.days() === 0) {
    return `${mo.hours()}h ${mo.minutes()}m ${mo.seconds()}s`
  } else {
    return `${mo.days()}d ${mo.hours()}h ${mo.minutes()}m ${mo.seconds()}s`
  }
}

export const wait = (seconds) => new Promise((resolve, reject) => { setTimeout(() => { resolve('ok') }, seconds) })
