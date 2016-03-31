"use strict";

var chai = require('chai');
chai.use(require('chai-as-promised'));
var assert = chai.assert;


var sinon = require('sinon');
var mockery = require('mockery');

describe('service/resourceRequest', () => {
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

    it('call request if interceptors clean', (done) => {
        var request = sinon.stub().returns(Promise.resolve());
        mockery.registerMock('./request', request);

        var resourceRequest = require('../../src/service/resourceRequest');

        resourceRequest()
            .then(() => {
                assert.isTrue(request.called, 'request did not call');

                done();
            });
    });

    describe('result promise', () => {
        it('return resolve promise if interceptor request resolved', () => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.resolve(config);
                }
            });

            return assert.isFulfilled(resourceRequest());
        });

        it('return reject promise if interceptor request reject', () => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.reject(config);
                }
            });

            return assert.isRejected(resourceRequest());
        });

        it('return resolve promise if interceptor response resolved', () => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                response: function(config) {
                    return Promise.resolve(config);
                }
            });

            assert.isFulfilled(resourceRequest());
        });

        it('return reject promise if interceptor response rejected', () => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                response: function(config) {
                    return Promise.reject(config);
                }
            });

            assert.isFulfilled(resourceRequest());
        });

        it('return resolve promise if request rejected and response catch resolved', () => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.reject(config);
                }
            });
            resourceRequest.interceptors.push({
                responseError: function(config) {
                    return Promise.resolve();
                }
            });

            assert.isFulfilled(resourceRequest());
        });
    });

    describe('call request', () => {
        it('call request if there is one interceptor', (done) => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.resolve(config);
                }
            });

            resourceRequest()
                .then(() => {
                    assert.isTrue(request.called, 'request did not call');
                    done();
                });
        });

        it('does not call request if there is one interceptor and it rejected', (done) => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.reject('MY error');
                }
            });

            resourceRequest()
                .then(() => {
                    try {
                        assert.isFalse(request.called, 'request was call');
                        done();
                    } catch (e) {
                        done(e);
                    }
                })
                .catch(() => {
                    assert.isFalse(request.called, 'request was call');
                    done();
                });
        });

        it('call request if last interceptor return resolve', (done) => {
            var request = sinon.stub().returns(Promise.resolve());
            mockery.registerMock('./request', request);

            var resourceRequest = require('../../src/service/resourceRequest');

            resourceRequest.interceptors.push({
                request: function(config) {
                    return Promise.resolve(config);
                }
            });
            resourceRequest.interceptors.push({
                requestError: function(config) {
                    return Promise.reject(config);
                }
            });

            resourceRequest()
                .then(() => {
                    assert.isTrue(request.called, 'request did not call');
                    done();
                });
        });
    });
});