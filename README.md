# 有赞开放平台官方 Node.js SDK

Official Node.js SDK for http://open.youzan.com

## Examples

```js
// 引入有赞SDK
var SDK = require('youzan-sdk');
// 初始化SDK，在 [https://koudaitong.com/v2/apps/open/setting](https://koudaitong.com/v2/apps/open/setting) 开启API接口，复制相应 AppID、AppSecert
var sdk = SDK({app: AppID, secret: AppSecert});
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
$ npm install youzan-sdk
```

## Youzan API

[有赞开放平台接口列表](http://open.youzan.com/api)

## Troubleshooting

1. 除了获取信息等操作使用get方法，其他默认都是POST，没有DELETE之类的方法

## Contact

<img src="/weixin.jpg" alt="二维码" width="200" height="auto" />
