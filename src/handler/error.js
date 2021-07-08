// eslint-disable-next-line no-unused-vars
module.exports = async (ctx, next) => {
  return next().catch((err) => {
    console.log(err)
    ctx.fail(err.message)
  })
}
