"use strict";

module.exports = [
    {
        request: function(config) {
            var path = config.path;

            var params = config.params || {};

            Object.keys(params).forEach((key) => {
                var RE = new RegExp(':' + key, 'i');
                if (RE.test(path)) {
                    path = path.replace(RE, params[key]);
                    delete params[key]
                }
            });

            config.path = path;
            config.params = params;

            return config;
        }
    }
];