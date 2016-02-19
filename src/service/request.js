"use strict";

var http = require('http');
var url = require('url');

var HttpClientFactory = require("http-client-factory");
var _ = require('lodash');

var methodsWithBody = [
    'POST',
    'PUT'
];

var clientParamNames = [
    'protocol', 'host', 'port', 'path'

];

function buildRequest(options) {
    var method = (options.method || 'get').toLowerCase();
    var params = options.params || {};
    var headers = options.headers || {};


    var clientParams = _.pick(options, clientParamNames);

    var client = HttpClientFactory.getClient(clientParams);


}

module.exports = function(options) {

    var method = (options.method || 'get').toLowerCase();
    var client = HttpClientFactory.getClient();

    return client[method]();

    var path = url.parse(options.path);

    options.headers = options.headers || {};

    return new Promise((resolve, reject) => {
        function callback(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                var result = {
                    response: response,
                    body: str
                };

                if (response.statusCode == 200) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });

            response.on('error', function(e) {
                reject(e);
            });
        }

        var postData;
        if (methodsWithBody.indexOf(options.method) > -1) {
            var data = options.params || {};
            postData = JSON.stringify(data);
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.headers['Content-Length'] = postData.length;
        } else {
            data =
            options.path = url.format(path.search)
        }

        var request = http.request(options, callback);

        if(postData) {
            request.write(postData);
        }

        request.end();
    });
};