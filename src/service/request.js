"use strict";

var request = require('request');
var debug = require('./debug');

module.exports = function(options) {
    var params = options.params || {};

    var requestOptions = Object.assign({}, options, {
        uri: Object.assign({}, options.uri),
        body: Object.assign({}, options.body, params),
        json: true,
        method: options.method || 'GET'
    });

    debug.log('requestOptions:', requestOptions);
    return new Promise((resolve, reject) => {
        request(requestOptions, (err, response, body) => {
            if (err) {
                debug.log('request error:', err);
                reject(err);
            } else if (response.statusCode !== 200) {
                debug.log('request status error:', response.statusCode);
                reject({response, body})
            } else {
                debug.log('response', response);
                debug.log('body', body);
                resolve({response, body});
            }
        });
    });
};