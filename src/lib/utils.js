import moment from "moment";

export const deepFreeze = (obj) => {
  for (const key in obj) {
    let v = obj[key]
    if (v && typeof v === 'object') {
      deepFreeze(v)
    }
  }
  return Object.freeze(obj)
}

export const remainingTime = (seconds) => {
  const $moment = moment.duration(seconds, 'seconds');
  if ($moment.days() == 0) {
    return `${$moment.hours()}h ${$moment.minutes()}m ${$moment.seconds()}s`
  } else {
    return `${$moment.days()}d ${$moment.hours()}h ${$moment.minutes()}m ${$moment.seconds()}s`
  }
}

export const wait = (seconds) => new Promise((resolve, reject) => { setTimeout(() => { resolve('ok')}, s)})