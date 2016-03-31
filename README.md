j-resource
==========

It is a library like ngResource form angular.js

# Use
```js
var Resources = require('j-resource');

var config = {

    // it is a config for request lib
    query: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
        },
        method: 'GET'
    }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result);
    });
```

# Extend behavior
```js
var Resources = require('j-resource');

Resources.addInterceptor({
    request: function(config) {
        config = Object.assign({}, config);
        var url = config.url;
        delete config.url;

        config.uri = {
            hostname: 'my.domain.com',
            path: url,
            port: '80',
            protocol: 'http:'
        };

        return config;
    }
});

var config = {

    // it is a config for request lib
    query: {
        url: '/user',
        method: 'GET'
    }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });
```

# Check response status
```js
var Resources = require('j-resource');

Resources.addInterceptor({
    response: function(result) {
            switch (result.response.statusCode) {
                case (200):
                case (201):
                case (202):
                case (203):
                case (204):
                    return result;
                    break;
                default:
                    throw result;
            }
        }
});

var config = {

    // it is a config for request lib
    query: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
        },
        method: 'GET'
    }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });
```


# Errors
```js
var Resources = require('j-resource');

Resources.addInterceptor({
    responseError: function(error) {
        console.log(error);

        var defaultData = {
            string: 'foo'
        };

        return defaultData;
    }
});

var config = {

    // it is a config for request lib
    query: {
        uri: {
            hostname: 'bad.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
        },
        method: 'GET'
    }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });
```

# Sending data
```js
var Resources = require('j-resource');

var config = {

    // it is a config for request lib
    add: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
        },
        method: 'PUT'
    }
};

var user = new Resources(config);

user
    .add({name: 'Matvei'})
    .then((result) => {
        console.log(result)
    })
```

# Uri params
```js
var Resources = require('j-resource');

Resources.addInterceptor('paramsToUri');

var config = {

    // it is a config for request lib
    getItem: {
        uri: {
            hostname: 'localhost',
            path: '/user/:name',
            port: '80',
            protocol: 'http:'
        },
        method: 'get'
    }
};

var user = new Resources(config);

user
    .getItem({name: 'Matvei'})
    .then((result) => {
        console.log(result)
    })
```

# Interceptors for one resource
```js
var Resources = require('j-resource');

Resources.addInterceptor('paramsToUri');


var right = new Resources({
    check: {
        uri: {
            hostname: 'right.domain.com',
            path: '/:resource/:action',
            port: '80',
            protocol: 'http:'
        }
    }
});

var config = {

    // it is a config for request lib
    add: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user/:name',
            port: '80',
            protocol: 'http:'
        },
        method: 'get',
        interceptors: [{
            request: function(config) {
                return right
                    .check({
                        resource: 'user',
                        action: 'get'
                    })
                    .then(() => {
                        return config;
                    });
            }
        }]
    }
};

var user = new Resources(config);

user
    .add({name: 'Matvei'})
    .then((result) => {
        console.log(result)
    })
    .catch(() => {
        console.log(e);
    });
```

# Change transport
By default `j-resourse` uses npm module `request` but you can change it.
 
```js
var Resources = require('j-resource');
var myHttpLib = require('my-http-lib');

setTransport.setTransport(function(config) {
    return new Promise(function(resolve, reject) {
        if (config.type == 'save') {
            myHttpLib.post('http://mydomian.com', config.params, cb);
        } else if (config.type == 'find') {
            myHttpLib.get('http://mydomian.com', config.params, cb);
        } else {
            cb('There is no type');
        }
        
        function cb(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }
    });
});

var config = {
    addMyModel: {
        type: 'save'
    },
    getMyModel: {
        type: 'faind'
    }
};

var user = new Resources(config);

user
    .addMyModel()
    .then((result) => {
        console.log(result);
    });
```
