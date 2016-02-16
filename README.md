j-resource
==========

# Use
```js
var Resources = require('j-resource');

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