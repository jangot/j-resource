"use strict";

var request = require('http');
var createResponse = require('./createResponse');

var interceptors = [];
var beforeInterceptors = [];
var afterInterceptors = [];

function resourceRequest(config, Resource) {
    promisifyIntersepters(config, 'request')
        .then((config) => {
            return request(config)
                .catch((e) => {
                    throw {
                        requestError: e
                    }
                });
        })
        .catch((e) => {
            if (e.requestError) {
                throw e.requestError;
            } else {
                return promisifyIntersepters(config, 'requestError')
            }
        })
        .then((response) => {
            return promisifyIntersepters(response, 'response');
        })
        .catch((e) => {
            return promisifyIntersepters(e, 'responseError');
        });
}

function promisifyIntersepters(params, interceptorType) {
    var allInterceptors = [].concat(beforeInterceptors, interceptors, afterInterceptors);

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