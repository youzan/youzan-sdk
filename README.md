# 有赞开放平台 Node.js SDK

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

Yet Another Node.js SDK for http://open.youzan.com

## Examples

```js
// 引入有赞SDK
var SDK = require('youzan-sdk');
// 初始化SDK，在 https://koudaitong.com/v2/apps/open/setting 开启API接口，复制相应 AppID、AppSecert
var sdk = SDK({key: AppID, secret: AppSecert});
// 用GET方法 获取出售中的商品列表
sdk.get('kdt.items.onsale.get', {
    page_size: 20,
    ...
}).then(function(data) {
    // do some thing with data
});

// 用POST 新建商品
sdk.post('kdt.item.add', {
    price: 100,
    title: 'Node.js sdk test',
    is_virtual: 0,
    post_fee: 10.00
}, {
    images: [__dirname + '/test.jpg']
}).then(function(data) {
    // make some thing
});
```

## Installation

```
$ npm install youzan-sdk --save
```

## Youzan API

[有赞开放平台接口列表](http://open.youzan.com/api)

## Troubleshooting

1. 除了获取信息等操作使用get方法，其他默认都是POST，没有DELETE之类的方法
2. 这是一个简易的SDK，如果觉得不好用，可以 Fork；当然欢迎 pull request 以及提 issues


[npm-image]: https://img.shields.io/npm/v/youzan-sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/youzan-sdk
[travis-image]: https://img.shields.io/travis/rayqian/youzan-sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/rayqian/youzan-sdk
[downloads-image]: http://img.shields.io/npm/dm/youzan-sdk.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/youzan-sdk
