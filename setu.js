const got = require('got').default
const config = require('./default-config.js')

const loli = got.extend({
  prefixUrl: 'https://api.lolicon.app',
  responseType: 'json'
})

module.exports = async function getSetu (r18) {
  r18 = (r18 && (['0', '1', '2'].includes(r18) ? r18 : '1')) || '1'
  const searchParams = {
    r18,
    size1200: 'true'
  }
  if (config.loliconKey) {
    searchParams.apikey = config.loliconKey
  }
  let r
  try {
    r = await loli.get('setu', { searchParams })
  } catch (_) {
    return '哎呀呀～好像出了什么问题'
  }
  const res = r.body
  const messagelist = []
  if (res.code === 0) {
    const item = res.data[0]
    messagelist.push(`作者：${item.author}`)
    messagelist.push(`PID：${item.pid}`)
    // messagelist.push(`标签：${item.tags.join(', ')}`)
    messagelist.push(`标题：${item.title}`)
    messagelist.push(`尺寸：${item.width} × ${item.height}`)
    messagelist.push(`UID：${item.uid}`)
    messagelist.push(`地址：${item.url}`)

    messagelist.push(`\r\n今天还剩 ${res.quota} 次机会可以向我要图哦`)

    return messagelist.join('\r\n')
  } else if (code === 429) {
    return '哼哼！今天的机会已经用完咯，年轻人要有点节制'
  } else {
    return '哎呀呀～拿不到图了呢'
  }
}
