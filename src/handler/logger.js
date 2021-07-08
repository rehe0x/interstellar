module.exports = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  console.log(`param ${JSON.stringify(ctx.request.body)}`)
}
