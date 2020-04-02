let config
try {
  config = require('./config.js')
} catch (_) {
  try {
    config = require('./config.json')
  } catch (_) {
    console.log('未找到配置文件')
    config = {
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
  }
}

module.exports = config
