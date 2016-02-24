"use strict";

var debug = require('../debug');

module.exports = {
    request: function(config) {
        var path = config.path;

        var params = config.params || {};

        Object.keys(params).forEach((key) => {
            var RE = new RegExp(':' + key, 'i');
            if (RE.test(path)) {
                debug.log('interceptor, paramsToUrl, add param', key, params[key]);
                path = path.replace(RE, params[key]);
                delete params[key]
            }
        });

        config.path = path;
        config.params = params;

        debug.log('interceptor, paramsToUrl', config);
        return config;
    }
};