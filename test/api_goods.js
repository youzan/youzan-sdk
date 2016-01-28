var assert = require('assert');
var SDK = require('../index');
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

    describe('kdt.items.update', function() {
        it('should update goods', function(done) {
            return sdk.post('kdt.items.update', {
                num_iid: 210214637,
                title: 'Node.js update test'
            }).then(function(data) {
                console.log(data);
            });
        });
    });

    describe('kdt.items.add', function() {
        it('should create goods successfully', function(done) {
            return sdk.post('kdt.item.add', {
                price: 100,
                title: 'Node.js sdk test',
                is_virtual: 0,
                post_fee: 10.00
            }, {
                images: [__dirname + '/test.jpg']
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
