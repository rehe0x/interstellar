async function heavyCompute (n, callback) {
  let count = 0
  let i; let j

  for (i = n; i > 0; --i) {
    for (j = n; j > 0; --j) {
      count += 1
    }
  }

  callback(count)
}

heavyCompute(10000, function (count) {
  console.log(count)
})

console.log('hello')

const doSomethingAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('I did something'), 0)
  })
}
const doSomething = async () => {
  console.log(await doSomethingAsync())
}
console.log('Before')
doSomething()
console.log('After')
