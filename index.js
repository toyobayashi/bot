const config = require('./default-config.js')
const msg = require('./message.js')
const { randomAccess, parseMessage, parsePrivateMessage } = require('./util.js')
const Bot = require('./bot.js')

const getSetu = require('./setu.js')
const trsl = require('./trsl.js')

async function main (args, isGroup) {
  console.log(args)

  if (args.length === 1) {
    return {
      reply: randomAccess(isGroup ? msg.groupAisatsu : msg.aisatsu),
      at_sender: false
    }
  }

  if (args[1] === 'help') {
    return {
      reply: randomAccess(isGroup ? msg.groupHelp : msg.help),
      at_sender: false
    }
  }

  if (args[1] === 'setu') {
    const reply = await getSetu(args[2])
    return {
      reply,
      at_sender: false
    }
  }

  if (Object.keys(trsl).includes(args[1])) {
    const reply = await trsl[args[1]](args[2] || '')
    return {
      reply,
      at_sender: false
    }
  }

  return {
    reply: randomAccess(msg.error),
    at_sender: false
  }
}

const bot = new Bot(config)

// 讨论组消息
bot.on('message-discuss', async (event) => {
  const discussGroups = config.allow ? config.allow.discussGroups : null
  const isarr = Array.isArray(discussGroups)
  if ((isarr && discussGroups.includes(event.discuss_id)) || !arr) {
    const cmd = parseMessage(event.message)
    if (cmd.reply) {
      const resbody = await main(cmd.args, true)
      return resbody
    } else {
      return {}
    }
  } else {
    return {}
  }
})

// 私发消息
bot.on('message-private', async (event) => {
  const cmd = parsePrivateMessage(event.message)
  if (cmd.reply) {
    const resbody = await main(cmd.args, false)
    return resbody
  } else {
    return {}
  }
})

// 好友请求
bot.on('request-friend', (event) => {
  const requestFriends = config.allow ? config.allow.requestFriends : null
  const isarr = Array.isArray(requestFriends)
  if ((isarr && requestFriends.includes(event.user_id)) || !arr) {
    return { approve: true }
  } else {
    return {}
  }
})

bot.listen(8095, '0.0.0.0', () => {
  if (config.developerQQ) {
    bot.sendPrivateMsg(config.developerQQ, '服务器启动' + new Date().toLocaleString())
  }
})
