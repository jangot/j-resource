"use strict";

var debug = false;
module.exports = {
    log: function() {
        if (debug) {
            console.log.apply(console, arguments);
        }
    },
    debug: function(flag) {
        debug = !!flag;
    }
};
