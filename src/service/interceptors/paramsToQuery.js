"use strict";

var debug = require('../debug');

var requestsForQuery = [
    'GET', 'HEAD'
];

module.exports = {
    request: function(config) {
        if (requestsForQuery.indexOf(config.method) === -1) {
            return config;
        }

        var params = config.params || {};
        delete config.params;

        var qs = config.qs || {};
        config.qs = Object.assign(qs, params);

        debug.log('interceptor, paramsToQuery', config);
        return config;
    }
};