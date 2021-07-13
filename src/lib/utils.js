export const deepFreeze = (obj) => {
  for (const key in obj) {
    let v = obj[key]
    if (v && typeof v === 'object') {
      deepFreeze(v)
    }
  }
  return Object.freeze(obj)
}
