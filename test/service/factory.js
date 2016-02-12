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
        var factory = require('../../src/service/factory');
        assert.isFunction(factory, 'service is not function')
    });

    it('instance has method from config', () => {
        var factory = require('../../src/service/factory');

        var NewClass = factory({
            test: {}
        });
        var instance = new NewClass;

        assert.isFunction(instance.test, 'method is not function');
    });

    it('Class has method from config', () => {
        var factory = require('../../src/service/factory');

        var NewClass = factory({
            test: {}
        });

        assert.isFunction(NewClass.test, 'method is not function');
    });

    it('instance method calls `resourceRequest`', () => {
        var resourceRequest = sinon.spy();
        mockery.registerMock('./resourceRequest', resourceRequest);

        var factory = require('../../src/service/factory');

        var NewClass = factory({
            test: {}
        });
        var instance = new NewClass;
        instance.test();

        assert.isTrue(resourceRequest.called, 'resourceRequest did not call');
    });

    it('Class method calls `resourceRequest`', () => {
        var resourceRequest = sinon.spy();
        mockery.registerMock('./resourceRequest', resourceRequest);

        var factory = require('../../src/service/factory');

        var NewClass = factory({
            test: {}
        });
        NewClass.test();

        assert.isTrue(resourceRequest.called, 'resourceRequest did not call');
    });
});