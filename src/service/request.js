"use strict";

var HttpClientFactory = require("http-client-factory");
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
    var requestOptions = _.pick(options, clientParamNames);

    var client = HttpClientFactory.getClient();

    return client.send(requestOptions, params);
};