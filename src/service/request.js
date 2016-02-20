"use strict";


var request = require('request');
var _ = require('lodash');

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

    return new Promise((resolve, reject) => {
        request(requestOptions, (err, response, body) => {
            if (err) {
                reject(err);
            } else if (response.statusCode !== 200) {
                reject({response, body})
            } else {
                resolve({response, body});
            }
        });
    });
};