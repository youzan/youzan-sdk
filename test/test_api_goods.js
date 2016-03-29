import test from 'ava';
import SDK from '../index';

// 请添加你自己的key 和 secret，参考 config.example.js，改名成config.js
// module.exports = {
//    key: '',
//    secret: ''
//};
var config = require('./config');

var sdk = SDK(config);

test('kdt.items.onsale.get', () => {
    return sdk.get('kdt.items.onsale.get');
});

test('kdt.item.update', () => {
    return sdk.post('kdt.item.update', {
        num_iid: 210214637,
        title: 'Node.js update test'
    });
});

test('kdt.item.add', () => {
    return sdk.post('kdt.item.add', {
        price: 100,
        title: 'Node.js sdk test',
        is_virtual: 0,
        post_fee: 10.00
    }, {
        images: [__dirname + '/assets/tmp0.jpg', __dirname + '/assets/1.jpg']
    });
});

test('kdt.users.weixin.follower.tags.add', () => {
    return sdk.post('kdt.users.weixin.follower.tags.add', {
        tags: ['阿道夫'],
        user_id: 1049187766
    });
});
