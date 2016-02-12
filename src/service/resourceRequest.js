"use strict";

var defaultInterceptors = require('./defaultInterceptors');

var interceptors = [];

function resourceRequest(config) {
    Promise
        .resolve()
        .then(() => {
            return promisifyIntersepters(config, 'request')
        })
        .catch((e) => {
            return promisifyIntersepters(e, 'requestError')
        })
        .then((response) => {
            return promisifyIntersepters(response, 'response');
        })
        .catch((e) => {
            return promisifyIntersepters(e, 'responseError');
        });
}

function promisifyIntersepters(params, interceptorType) {
    var allInterceptors = [].concat(defaultInterceptors.before, interceptors, defaultInterceptors.after);

    return allInterceptors.reduce(
        (prev, curr) => {
            if (curr[interceptorType]) {
                return prev.then(curr[interceptorType]);
            }

            return prev;
        },
        Promise.resolve(params)
    );
}

resourceRequest.interceptors = interceptors;
module.exports = resourceRequest;