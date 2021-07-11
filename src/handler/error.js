// eslint-disable-next-line no-unused-vars
export const error = async (ctx, next) => {
  return next().catch((err) => {
    console.log(err)
    ctx.fail(err.message)
  })
}
