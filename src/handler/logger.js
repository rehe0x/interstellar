export const logger = async (ctx, next) => {
  console.log(`param body ${JSON.stringify(ctx.request.body)} query ${JSON.stringify(ctx.request.query)}`)
  await next()
}
