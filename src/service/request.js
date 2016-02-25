"use strict";


var request = require('request');
var _ = require('lodash');
var debug = require('./debug');

var clientParamNames = [
    'protocol',
    'host',
    'hostname',
    'family',
    'port',
    'localAddress',
    'socketPath',
    'path',
    'headers',
    'auth',
    'agent'
];

module.exports = function(options) {
    var params = options.params || {};
    var requestOptions = {
        url: _.pick(options, clientParamNames),
        body: params,
        json: true,
        method: options.method || 'GET'
    };

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