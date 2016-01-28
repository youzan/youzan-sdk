var crypto = require('crypto');

var Protocol = {
    APP_ID_KEY: 'app_id',
    METHOD_KEY: 'method',
    TIMESTAMP_KEY: 'timestamp',
    FORMAT_KEY: 'format',
    VERSION_KEY: 'v',
    SIGN_KEY: 'sign',
    SIGN_METHOD_KEY: 'sign_method'
};

Protocol.sign = function(appSecret, params, method) {
    params = params || {};
    method = method || 'md5';

    var arr = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            arr.push(key + params[key]);
        }
    }

    arr = arr.sort(function(a, b) {
        if (a[0] > b[0]) {
            return 1;
        }
        if (a[0] < b[0]) {
            return -1;
        }
        return 0;
    });

    return Protocol.hash(method, appSecret + arr.join('') + appSecret);
};

Protocol.hash = function(method, str) {
    if (method === 'md5') {
        var md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex').toLowerCase();
    } else {
        throw new Error('Not support hash method: ' + method);
    }
};

Protocol.allowedSignMethods = function() {
    return ['md5'];
};

Protocol.allowedFormat = function() {
    return ['json'];
};

module.exports = Protocol;
