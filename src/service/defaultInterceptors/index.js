"use strict";

var request = require('../request');

module.expotrs = {
    before: [],
    after: [
        {
            request: function(config) {
                return request(config)
                    .catch((e) => {
                        throw {
                            requestError: e
                        }
                    });
            }
        }
    ]
};