"use strict";

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
module.exports.addInterceptor = function(interceptor) {
    if (typeof interceptor === 'string') {
        interceptor = embeddedInterceptors[interceptor];
    }
    if (!interceptor) {
        throw Error('Interceptor does not exist.')
    }
    resourceRequest.interceptors.push(interceptor);
};
module.exports.debug = function() {
    debug.debug(true);
};