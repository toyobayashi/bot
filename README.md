# Bot

一个很敷衍的 QQ 机器人。

环境要求：最近版本的 Node.js

``` bash
$ git clone https://github.com/toyobayashi/bot
$ cd ./bot

$ npm install

$ vi ./config.js

$ npm start
```

`config.js` 配置文件自己新建哦

``` js
module.exports = {
  accessToken: 'abc', // node server -> cqhttp 用的
  secret: 'abc', // cqhttp -> node server 用的
  api: 'http://127.0.0.1:5700', // cqhttp 服务
  developerQQ: 123456789, // 开发者 QQ
  loliconKey: 'xxx', // 不解释
  allow: {
    discussGroups: null, // 也可以是 number[]，null 不做限制
    groups: null, // 也可以是 number[]，null 不做限制
    requestFriends: null, // 也可以是 number[]，null 不做限制
  }
}
```
