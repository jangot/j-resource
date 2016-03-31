"use strict";

var _ = require('lodash');
var resourceRequest = require('./src/service/resourceRequest');
var embeddedInterceptors = require('./src/service/interceptors');
var debug = require('./src/service/debug');

class Resource {
    constructor(config) {
        Object.keys(config).forEach((key) => {
            var methodParams = config[key] || {};
            this[key] = (params) => {
                methodParams.params = params;
                return resourceRequest.call(this, methodParams);
            };
        });
    }
}

module.exports = Resource;


module.exports.setTransport = function(fn) {
    if (!_.isFunction(fn)) {
        throw Error('Transport must be a function');
    }

    resourceRequest.transport = function(config) {
        return Promise
            .resolve()
            .then(function() {
                return fn(config);
            });
    };

    return this;
};

module.exports.addInterceptor = function(interceptor) {
    if (typeof interceptor === 'string') {
        interceptor = embeddedInterceptors[interceptor];
    }
    if (!interceptor) {
        throw Error('Interceptor does not exist.')
    }
    resourceRequest.interceptors.push(interceptor);

    return this;
};

module.exports.debug = function() {
    debug.debug(true);

    return this;
};