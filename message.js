const argv0 = 'bot'

function command (c, isGroup) {
  return isGroup ? `${argv0} ${c}` : `/${c}`
}

module.exports = {
  argv0,
  groupAisatsu: [
    `啊咧咧？有啥子事情咩？需要帮助的话说句【${command('help', true)}】就可以啦`,
    `需要一份涩图吗？说【${command('help', true)}】可以帮你哦`
  ],
  aisatsu: [
    `啊咧咧？有啥子事情咩？需要帮助的话对我说句【${command('help', false)}】就可以啦`,
    `需要一份涩图吗？对我说【${command('help', false)}】可以帮你哦`
  ],
  groupHelp: [
    '可以这样命令我哦\r\n\r\n' +
    `帮助：${command('help', true)}\r\n\r\n` +
    `随机涩图：${command('setu [0 | 1 | 2]', true)}\r\n` +
    '第三个是可选参数，0 是非 R18，1 是 R18，2 是混合，默认是 1'
  ],
  help: [
    '可以这样命令我哦\r\n\r\n' +
    `帮助：${command('help', false)}\r\n\r\n` +
    `随机涩图：${command('setu [0 | 1 | 2]', false)}\r\n` +
    '第二个是可选参数，0 是非 R18，1 是 R18，2 是混合，默认是 1'
  ],
  error: [
    '哎呀呀～你肯定搞错啦',
    '你说啥？没听懂唉'
  ]
}
