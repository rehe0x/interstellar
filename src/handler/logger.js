export const logger = async (ctx, next) => {
  console.log(`param ${JSON.stringify(ctx.request.body)}`)
  await next()
}
