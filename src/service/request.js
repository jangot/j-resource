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
    'method',
    'path',
    'headers',
    'auth',
    'agent'
];

module.exports = function(options) {
    var params = options.params || {};
    var requestOptions = {
        url: _.pick(options, clientParamNames),
        formData: params
    };

    return new Promise((resolve, reject) => {
        request(requestOptions, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve({response, body});
            }
        });
    });
};