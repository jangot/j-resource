"use strict";

var resourceRequest = require('./resourceRequest');

module.exports = function(config) {
    class Resource {
        constructor() {
            Object.keys(config).forEach((key) => {
                this[key] = () => {
                    return resourceRequest.call(this, config[key]);
                };
            });
        }
    }

    Object.keys(config).forEach((key) => {
        Resource[key] = () => {
            return resourceRequest(config[key], Resource);
        };
    });

    return Resource;
};