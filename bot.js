const Koa = require('koa')
const KoaRouter = require('@koa/router')
const parser = require('koa-bodyparser')
const auth = require('./auth.js')

const got = require('got').default

class Bot {
  constructor (config) {
    this._events = {}
    this.server = new Koa()
    const router = new KoaRouter()
    router.post('/', async (ctx) => {
      console.log(ctx.request.body)
      const event = ctx.request.body
      if (event.post_type === 'message' && event.message_type === 'discuss') {
        ctx.response.body = await Promise.resolve(this._call('message-discuss', event))
      } else if (event.post_type === 'message' && event.message_type === 'private') {
        ctx.response.body = await Promise.resolve(this._call('message-private', event))
      } else if (event.post_type === 'message' && event.message_type === 'group') {
        ctx.response.body = await Promise.resolve(this._call('message-group', event))
      } else if (event.post_type === 'request' && event.request_type === 'friend') {
        ctx.response.body = await Promise.resolve(this._call('request-friend', event))
      } else if (event.post_type === 'request' && event.request_type === 'group') {
        ctx.response.body = await Promise.resolve(this._call('request-group', event))
      } else {
        ctx.response.body = await Promise.resolve(this._call('default-post', event))
      }
    })

    this.server.use(parser())
    this.server.use(auth(config.secret))
    this.server.use(router.routes())
    this.server.use(router.allowedMethods())

    this.client = got.extend({
      prefixUrl: config.api,
      responseType: 'json',
      headers: {
        ...(config.accessToken ? { Authorization: `Bearer ${config.accessToken }`} : {})
      }
    })
  }

  on (event, callback) {
    this._events[event] = callback
    return this
  }

  off (event) {
    delete this._events[event]
    return this
  }

  _call (event, ...args) {
    if (typeof this._events[event] === 'function') {
      return this._events[event](...args)
    }
    return {}
  }

  /**
   * 发送私聊消息
   * @param {number} qq 
   * @param {string | {type: string;data: any}[]} message 
   */
  sendPrivateMsg (qq, message) {
    return this.client.post('send_private_msg', {
      json: {
        user_id: qq,
        message
      }
    })
  }

  listen (...args) {
    return this.server.listen(...args)
  }
}

module.exports = Bot
