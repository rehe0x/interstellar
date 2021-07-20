import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)

async function async1 () {
  console.log('async')
}
const ff = async1()
console.log(ff)

const t = new Date()
console.log(t + t.getTimezoneOffset)
console.log(t.getTime())

console.log(dayjs().format())
console.log(dayjs().valueOf())
const s = dayjs.duration(100, 'seconds')
console.log(dayjs(1626754984913).format())
console.log(s)
console.log(dayjs().toDate())
const sff = dayjs()
console.log(sff.format())
console.log(sff.format('YYYY-MM-DD HH:mm:ss'))
console.log(typeof sff.add(100, 'seconds').format())

