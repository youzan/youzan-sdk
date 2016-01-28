var co = require('co');
var request = require('request');
var url = require('url');

var Protocol = require('./src/protocol');

// SDK({}).get('method', {}).then(() => {});

function SDK(config) {
    if (!(this instanceof SDK)) {
        return new SDK(config);
    }
    this.config(config);
    return this;
}

SDK.VERSION = '1.0';
SDK.apiEntry = 'https://open.koudaitong.com/api/entry';

SDK.prototype.config = function(config) {
    config = config || {};

    if (!config.key || !config.secret) {
        throw new Error('key or secret can not be empty');
    }
    this._config = {
        key: config.key,
        secret: config.secret,
        format: config.format || 'json',
        signMethod: config.signMethod || 'md5'
    };
    return this;
};

SDK.prototype.get = function(method, params) {
    var _this = this;

    var obj = url.parse(SDK.apiEntry);
    obj.query = this._buildRequestParams(method, params);

    var requestURL = url.format(obj);
    return co(function *() {
        return yield new Promise(function (resolve, reject) {
            request({
                url: requestURL,
                method: 'GET'
            }, _this._parseResponse(resolve, reject));
        });
    });
};

SDK.prototype.post = function(method, params, files) {
    var _this = this;

    var form = this._buildRequestParams(method, params);

    return co(function *() {
        return yield new Promise(function (resolve, reject) {
            request({
                url: SDK.apiEntry,
                method: 'POST',
                form: form
            }, _this._parseResponse(resolve, reject));
        });
    });
};

SDK.prototype._parseResponse = function(resolve, reject) {
    return function (error, response, body) {
        if (!error) {
            var json = JSON.parse(body);

            if (json.error_response) {
                reject(json);
            } else {
                resolve(json);
            }
        } else {
            reject(error || body);
        }
    };
};

SDK.prototype._buildRequestParams = function(method, params) {
    params = params || {};
    var commonParams = this._getCommonParams(method);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            if (commonParams[key]) {
                throw new Error('request parameter key name conflicted with common parameter key name');
            }
            commonParams[key] = params[key];
        }
    }

    commonParams[Protocol.SIGN_KEY] = Protocol.sign(this._config.secret,
                                                    commonParams,
                                                    this._config.signMethod);

    return commonParams;
};

SDK.prototype._getCommonParams = function(method) {
    var params = {};
    params[Protocol.APP_ID_KEY] = this._config.key;
    params[Protocol.METHOD_KEY] = method;
    params[Protocol.TIMESTAMP_KEY] = this._getDate();
    params[Protocol.FORMAT_KEY] = this._config.format,
    params[Protocol.SIGN_METHOD_KEY] = this._config.signMethod;
    params[Protocol.VERSION_KEY] = SDK.VERSION;

    return params;
};

SDK.prototype._getDate = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};

module.exports = SDK;
