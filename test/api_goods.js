var assert = require('assert');
var SDK = require('../index');
// 请添加你自己的key 和 secret
// module.exports = {
//    key: '',
//    secret: ''
//};

var config = require('./config');

describe('api goods test', function() {
    this.timeout(100000);
    var sdk = SDK(config);

    describe('kdt.items.onsale.get', function () {
        it('get goods list without params', function (done) {
            return sdk.get('kdt.items.onsale.get').then(function(data) {
                if (data) {
                    done();
                }
            }, function(err) {
                done(new Error(err));
            });
        });
    });

    // describe('kdt.items.update', function() {
    //     it('should update goods', function() {
    //         return sdk.post('kdt.items.update', {
    //             num_iid: 210214637,
    //             title: 'Node.js update test'
    //         }).then(function(data) {
    //             console.log(data);
    //         });
    //     });
    // });

    describe('kdt.users.weixin.follower.tags.add', function() {
        it('should update tags', function(done) {
            return sdk.post('kdt.users.weixin.follower.tags.add', {
                tags: ['阿道夫'],
                user_id: 1049187766
            }).then(function(data) {
                console.log(data);
                done();
            }, function(err) {
                done(new Error(err));
            });
        });
    });

    describe('kdt.items.add', function() {
        it('should create goods successfully', function(done) {
            return sdk.post('kdt.item.add', {
                price: 100,
                title: 'Node.js sdk test by Ray',
                is_virtual: 0,
                post_fee: 10.00
            }, {
                images: [__dirname + '/tmp0.jpg', __dirname + '/1.jpg']
            }).then(function(data) {
                if (data) {
                    console.log(data);
                    done();
                }
            }, function(err) {
                done(new Error(err));
            });
        });
    });
});
