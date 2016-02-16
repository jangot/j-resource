"use strict";

var request = require('./request');

var interceptors = [];

function resourceRequest(config) {
    config = config || {};

    var currentInterceptors = (config.interceptors || []).concat(interceptors);

    var requestPromise = runInterceptors(currentInterceptors, Promise.resolve(config), 'request')
        .then((config) => {
            return request(config);
        });

    return runInterceptors(currentInterceptors, requestPromise, 'response');
}

function runInterceptors(interceptors, startPromise, interceptorType) {
    function getNext(prevPromise, curr) {
        var CB = curr[interceptorType] || function(data) {return data};
        var errorCB = curr[interceptorType + 'Error'] || function(e) {throw e};

        return new Promise((resolve, reject) => {
            prevPromise
                .then((data) => {
                    Promise
                        .resolve()
                        .then(() => {
                            return CB(data);
                        })
                        .then(resolve)
                        .catch(reject)
                });
            prevPromise
                .catch((e) => {
                    Promise
                        .reject()
                        .catch(() => {
                            return errorCB(e);
                        })
                        .then(resolve)
                        .catch(reject)
                });
        });
    }

    return interceptors.reduce(
        (prev, curr) => {
            return getNext(prev, curr);
        },
        startPromise
    );
}

resourceRequest.interceptors = interceptors;
module.exports = resourceRequest;