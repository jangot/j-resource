"use strict";

var factory = require('./src/service/factory');
var resourceRequest = require('./src/service/resourceRequest');

module.exports = function(config) {
    config = config || {};

    return factory(config);
};

module.exports.addInterceptor = function(interceptor) {
    resourceRequest.interceptors.push(interceptor);
};