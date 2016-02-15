"use strict";

var request = require('./request');

var interceptors = [];

function resourceRequest(config) {
    var requestPromise = promisifyIntersepters(Promise.resolve(config), 'request')
        .then((config) => {
            return request(config);
        });

    return promisifyIntersepters(requestPromise, 'response');
}

function promisifyIntersepters(startPromise, interceptorType) {
    function getCallbacks(curr) {
        if (curr[interceptorType]) {
            var args = [curr[interceptorType]];
            var errorCB = curr[interceptorType + 'Error'];
            if (errorCB) {
                args.push(errorCB);
            }

            return args;
        } else {
            return [(res) => {
                return res;
            }];
        }
    }

    return interceptors.reduce(
        (prev, curr) => {
            var args = getCallbacks(curr);

            return prev.then.apply(prev, args);
        },
        startPromise
    );
}

resourceRequest.interceptors = interceptors;
module.exports = resourceRequest;