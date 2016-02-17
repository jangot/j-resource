"use strict";

var http = require('http');

module.exports = function(options) {
    return new Promise((resolve, reject) => {
        function callback(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                resolve(str);
            });

            response.on('error', function(e) {
                reject(e);
            });
        };

        http.request(options, callback).end();
    });
};