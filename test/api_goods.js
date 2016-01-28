var assert = require('assert');
var SDK = require('../index');
var config = require('./config');

describe('api goods test', function() {
    this.timeout(10000);
    describe('kdt.items.onsale.get', function () {
        it('get goods list without params', function (done) {
            var sdk = SDK(config);
            return sdk.get('kdt.items.onsale.get').then(function(data) {
                if (data) {
                    done();
                }
            }, function(err) {
                done(new Error(err));
            });
        });
    });
});
