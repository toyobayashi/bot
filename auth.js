const crypto = require('crypto')

module.exports = function (secret) {
  return async (ctx, next) => {
    if (secret) {
      ctx.assert(ctx.request.headers['x-signature'] !== undefined, 401)
      const hmac = crypto.createHmac('sha1', secret)
      hmac.update(ctx.request.rawBody)
      const sig = hmac.digest('hex')
      ctx.assert(ctx.request.headers['x-signature'] === `sha1=${sig}`, 403)
    }
    await next()
  }
}
