j-resource
==========

It is a library like ngResource form angular.js

# Use
```js
var Resources = require('j-resource');

var config = {

    // it is a config for resource lib
    query: {
         host: 'my.domain.com',
         path: '/user',
         port: '80',
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
        var newConfig = url.parse(config.url);
        delete config.url;
        
        for (var name in newConfig) {
            config[name] = newConfig[name]
        }
        
        return config;
    }
});

var config = {
    query: {
        url: 'http://my.domain.com/user',
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
         host: 'my.domain.com',
         path: '/user',
         port: '80',
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

# Sending data
```js
var Resources = require('j-resource');

var config = {
    add: {
         host: 'my.domain.com',
         path: '/user/add',
         port: '80',
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

var config = {
    getUser: {
         host: 'my.domain.com',
         path: '/user/:name',
         port: '80',
         method: 'GET'
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
The library does not have cache functionality. There is a simple way for it.
```js
var Resources = require('j-resource');
var cache = require('you-cache-lib');

var right = new Resource({
    check: {
        host: 'right.my.domain.com',
        path: '/:resource/:action',
        port: '80',
        method: 'GET'
    }
});

var config = {
    get: {
         host: 'my.domain.com',
         path: '/user/:name',
         port: '80',
         method: 'GET',
         interceptors: [{
            request: function(config) {
                return right.check({
                    resource: 'user',
                    action: 'get'
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