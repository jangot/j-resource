"use strict";

var debug = require('../debug');
var url = require('url');

var requestsForQuery = [
    'GET', 'HEAD'
];

module.exports = {
    request: function(config) {
        var method = config.method || 'GET';
        if (requestsForQuery.indexOf(method) === -1) {
            return config;
        }

        var params = config.params || {};
        delete config.params;

        var qs = config.uri.query || {};
        config.uri.search = url.format({
            query: Object.assign(qs, params)
        });

        debug.log('interceptor, paramsToQuery', config);
        return config;
    }
};