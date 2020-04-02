const deepMerge = require('deepmerge')

const defaultConfig = {
  accessToken: '',
  secret: '',
  api: 'http://127.0.0.1:5700',
  developerQQ: 0,
  loliconKey: '',
  allow: {
    discussGroups: null,
    groups: null,
    requestFriends: null
  }
}

let config
try {
  config = require('./config.js')
  config = deepMerge(defaultConfig, config)
} catch (_) {
  try {
    config = require('./config.json')
    config = deepMerge(defaultConfig, config)
  } catch (_) {
    console.log('未找到配置文件')
    config = defaultConfig
  }
}

module.exports = config
