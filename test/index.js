"use strict";

var assert = require('chai').assert;
var sinon = require('sinon');
var mockery = require('mockery');

describe('service/factory', () => {

    before(function() {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    afterEach(function() {
        mockery.resetCache();
        mockery.deregisterAll();
    });

    after(function() {
        mockery.disable();
    });

    it('is function', () => {
        var factory = require('../index');
        assert.isFunction(factory, 'service is not function')
    });

    it('instance has method from config', () => {
        var Resource = require('../index');

        var instance = new Resource({
            test: {}
        });

        assert.isFunction(instance.test, 'method is not function');
    });

    it('instance method calls `resourceRequest`', () => {
        var resourceRequest = sinon.spy();
        mockery.registerMock('./src/service/resourceRequest', resourceRequest);

        var Resource = require('../index');

        var instance = new Resource({
            test: {}
        });
        instance.test();

        assert.isTrue(resourceRequest.called, 'resourceRequest did not call');
    });
});