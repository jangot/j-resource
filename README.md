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
        console.log(result)
    })
```

# Extend behavior
```js
var Resources = require('j-resource');
var url = require('url');

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
        }
        
        return config;
    }
});

var config = {
    query: {
        url: '/user',
        method: 'GET'
       }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result)
    })

```

# Errors
```js
var Resources = require('j-resource');

Resources.addInterceptor({
    responceError: function(error) {
        console.log(error);
        
        var dafaultData = {
            string: 'foo'
        }
        
        return defaultData;
    }
});


var config = {
    query: {
         uri: {
            hostname: 'my.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
         }
    }
};

var user = new Resources(config);

user
    .query()
    .then((result) => {
        console.log(result)
    })
```

# Sending data
```js
var Resources = require('j-resource');

var config = {
    add: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user',
            port: '80',
            protocol: 'http:'
        },
        method: 'POST'
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
    getUser: {
         uri: {
             hostname: 'my.domain.com',
             path: '/user/:id',
             port: '80',
             protocol: 'http:'
         }
    }
};

var user = new Resources(config);

user
    .getUser({name: 'Matvei'})
    .then((result) => {
        console.log(result)
    })
```

# Interceptors for one resource
```js
var Resources = require('j-resource');
Resources.addInterceptor('paramsToUri');

var right = new Resource({
    check: {
        uri: {
            hostname: 'right.my.domain.com',
            path: '/:resource/:action',
            port: '80',
            protocol: 'http:'
        }
    }
});

var config = {
    get: {
        uri: {
            hostname: 'my.domain.com',
            path: '/user/:id',
            port: '80',
            protocol: 'http:'
        }
        method: 'GET',
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
    .getUser({name: 'Matvei'})
    .then((result) => {
        console.log(result)
    })
    .catch(function(err) {
        console.log(err)
    });
```
