"use strict";

var resourceRequest = require('./src/service/resourceRequest');

class Resource {
    constructor(config) {
        Object.keys(config).forEach((key) => {
            var methodParams = config[key];
            this[key] = () => {
                console.log('KEY', key);
                return resourceRequest.call(this, methodParams);
            };
        });
    }
}

module.exports = Resource;

module.exports.addInterceptor = function(interceptor) {
    resourceRequest.interceptors.push(interceptor);
};