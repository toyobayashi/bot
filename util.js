const msg = require('./message.js')

function randomAccess (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function parse (message) {
  const args = []
  let i = 0
  let quoted = false
  let arg = ''
  while (i < message.length && message[i] !== '\n') {
    if (message[i] !== ' ') {
      if (message[i] === '"') {
        quoted = !quoted
      } else {
        arg += message[i]
      }
    } else {
      if (!quoted) {
        if (arg) {
          args.push(arg)
          arg = ''
        }
      } else {
        arg += ' '
      }
    }
    i++
  }
  args.push(arg)
  arg = ''
  return args
}

function parseMessage (message) {
  message = message.trim()
  if (message.startsWith(`${msg.argv0} `)) {
    return {
      reply: true,
      args: parse(message)
    }
  }
  if (message === msg.argv0) {
    return {
      reply: true,
      args: [msg.argv0]
    }
  }
  return {
    reply: false,
    args: []
  }
}

function parsePrivateMessage (message) {
  message = message.trim()
  if (message.startsWith('/')) {
    const args = parse(message.substring(1))
    args.unshift(msg.argv0)
    return {
      reply: true,
      args
    }
  }
  return {
    reply: true,
    args: [msg.argv0]
  }
}

module.exports = {
  randomAccess,
  parseMessage,
  parsePrivateMessage
}
