const got = require('got').default

const client = got.extend({
  prefixUrl: 'https://translate.google.cn',
  responseType: 'json'
})

var xo=function(a){return function(){return a}};
var yo=function(a,b){for(var c=0;c<b.length-2;c+=3){var d=b.charAt(c+2);d="a"<=d?d.charCodeAt(0)-87:Number(d);d="+"==b.charAt(c+1)?a>>>d:a<<d;a="+"==b.charAt(c)?a+d&4294967295:a^d}return a};
var zo=null;
var window={TKK:"435819.1958473774"};
var Ao=function(a){if(null!==zo)var b=zo;else{b=xo(String.fromCharCode(84));var c=xo(String.fromCharCode(75));b=[b(),b()];b[1]=c();b=(zo=window[b.join(c())]||"")||""}var d=xo(String.fromCharCode(116));c=xo(String.fromCharCode(107));d=[d(),d()];d[1]=c();c="&"+d.join("")+
"=";d=b.split(".");b=Number(d[0])||0;for(var e=[],f=0,g=0;g<a.length;g++){var k=a.charCodeAt(g);128>k?e[f++]=k:(2048>k?e[f++]=k>>6|192:(55296==(k&64512)&&g+1<a.length&&56320==(a.charCodeAt(g+1)&64512)?(k=65536+((k&1023)<<10)+(a.charCodeAt(++g)&1023),e[f++]=k>>18|240,e[f++]=k>>12&63|128):e[f++]=k>>12|224,e[f++]=k>>6&63|128),e[f++]=k&63|128)}a=b;for(f=0;f<e.length;f++)a+=e[f],a=yo(a,"+-a^+6");a=yo(a,"+-3^+b+-f");a^=Number(d[1])||0;0>a&&(a=(a&2147483647)+2147483648);a%=1E6;return c+(a.toString()+"."+
(a^b))};

function createTranslateFunction (source, target) {
  return async function (str) {
    let res
    try {
      res = await client.get('translate_a/single?client=webapp&sl=' + source + '&tl=' + target + '&dt=t' + Ao(str) + '&q=' + encodeURI(str))
    } catch (_) {
      return '我也听不懂嘛'
    }
  
    const body = res.body
    if (Array.isArray(body) && Array.isArray(body[0]) && Array.isArray(body[0][0])) {
      const result = body[0][0][0]
      if (typeof result === 'string') {
        if (result) {
          return result
        } else {
          return '没有翻译结果哦'
        }
      }
      return '翻译出错啦'
    } else {
      return '？'
    }
  }
}

module.exports = {
  trjc: createTranslateFunction('ja', 'zh-CN'),
  trcj: createTranslateFunction('zh-CN', 'ja'),
  trec: createTranslateFunction('en', 'zh-CN'),
  trce: createTranslateFunction('zh-CN', 'en'),
}
