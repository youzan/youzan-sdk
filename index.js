var request = require('request');
var url = require('url');
var fs = require('fs');

var Protocol = require('./src/protocol');

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
    return new Promise(function (resolve, reject) {
        request({
            url: requestURL,
            method: 'GET'
        }, _this._parseResponse(resolve, reject));
    });
};

SDK.prototype.post = function(method, params, files) {
    var _this = this;

    var data = this._buildRequestParams(method, params);
    if (files) {
        data = this._addFiles(data, files);
    }

    return new Promise(function (resolve, reject) {
        request({
            url: SDK.apiEntry,
            method: 'POST',
            formData: data
        }, _this._parseResponse(resolve, reject));
    });
};

SDK.prototype._parseResponse = function(resolve, reject) {
    return function (error, response, body) {
        if (!error) {
            var json = JSON.parse(body);

            if (json.error_response) {
                reject(body);
            } else {
                resolve(json);
            }
        } else {
            reject(error || body);
        }
    };
};

SDK.prototype._addFiles = function(params, files) {
    for (var key in files) {
        if (files.hasOwnProperty(key)) {
            if (params[key]) {
                throw new Error('request parameter has a key name same with filename: ', key);
            }

            var file = files[key];
            var tempArr = [];
            if (!Array.isArray(file)) {
                file = [file];
            }
            for (var i = 0; i < file.length; i++) {
                tempArr.push(fs.createReadStream(file[i]));
            }
            if (key.indexOf('[]') < 0) {
                key += '[]';
            }
            params[key] = tempArr;
        }
    }
    return params;
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
    var time = new Date();
    function format(str) {
        return str.toString().length === 1 ? '0' + str : str;
    }
    var month = time.getMonth() + 1;
    month = format(month);
    var day = time.getDate();
    day = format(day);
    var hour = time.getHours();
    hour = format(hour);
    var min = time.getMinutes();
    min = format(min);
    var sec = time.getSeconds();
    sec = format(sec);

    return time.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
};

module.exports = SDK;
