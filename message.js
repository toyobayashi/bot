const argv0 = 'bot'

function command (c, isGroup) {
  return isGroup ? `${argv0} ${c}` : `/${c}`
}

function createHelp (isGroup) {
  return [
    '可以这样命令我哦\r\n\r\n' +
    `帮助：${command('help', isGroup)}\r\n\r\n` +
    `翻译：${command('trjc <日语>', isGroup)}\r\n` +
    `翻译：${command('trcj <中文>', isGroup)}\r\n` +
    `翻译：${command('trec <英语>', isGroup)}\r\n` +
    `翻译：${command('trce <中文>', isGroup)}\r\n\r\n` +
    `随机涩图：${command('setu [0 | 1 | 2]', isGroup)}\r\n` +
    `0 是非 R18，1 是 R18，2 是混合，默认是 1\n\n` +
    `尖括号表示必填的参数，方括号表示可选的参数，如果参数带空格，要使用半角双引号哦。比如你可以这样说：\r\n` +
    `${command('setu', isGroup)}\r\n` + 
    `${command('trjc セートゥー欲しい？', isGroup)}\r\n` +
    `${command('trec "Would you like a setu?"', isGroup)}`
  ]
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
  groupHelp: createHelp(true),
  help: createHelp(false),
  error: [
    '哎呀呀～你肯定搞错啦',
    '你说啥？没听懂唉'
  ]
}
