"use strict";

var assert = require('assert');

describe('dragonnodejs/dragonnodejs', function () {

    var dragonnodejs = require('../index.js');
    var npm = {
        libraries: __dirname + '/libraries/',
        modules: __dirname + '/modules/'
    };
    var directory = __dirname + '/modules/';

    it('should have dragonnodejs as service', function () {
        var config = {
            libraries: {},
            modules: {}
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(typeof services.dragonnodejs, 'function', 'services.dragonnodejs should be a function');
        });
    });

    it('should have the nodejs library in the service container', function () {
        var config = {
            libraries: {
                nodejs: { util: 'util' }
            },
            modules: {}
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(typeof services.util, 'object', 'services.util should be a object');
        });
    });

    it('should allow alias for a nodejs library', function () {
        var config = {
            libraries: {
                nodejs: { alias: 'util' }
            },
            modules: {}
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(typeof services.util, 'undefined', 'services.util should be undefined');
            assert.equal(typeof services.alias, 'object', 'services.alias should be a object');
        });
    });

    it('should have the npm library in the service container', function () {
        var config = {
            npm: npm.libraries,
            libraries: {
                npm: { definelibrary: 'definelibrary' }
            },
            modules: {}
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.definelibrary, 'example', 'services.definelibrary should be "example"');
        });
    });

    it('should allow alias for a npm library', function () {
        var config = {
            npm: npm.libraries,
            libraries: {
                npm: { alias: 'definelibrary' }
            },
            modules: {}
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(typeof services.definelibrary, 'undefined', 'services.definelibrary should be undefined');
            assert.equal(services.alias, 'example', 'services.definelibrary should be "example"');
        });
    });

    it('should allow a npm module to define service', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { defineservice: {} }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
        });
    });

    it('should give a npm module the defined services', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    defineservice: {},
                    useservice: {}
                }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.service, 'example', 'module should defined "example" from services');
        });
    });

    it('should give a npm module the configuration', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { useconfig: { example: 'example' } }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.config, 'example', 'module should have "example" from configuration');
        });
    });

    it('should allow a directory module to define services', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { defineservice: {} }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
        });
    });

    it('should give a directory module the defined services', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    defineservice: {},
                    useservice: {}
                }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.service, 'example', 'module should defined "example" from services');
        });
    });

    it('should give a directory module the configuration', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { useconfig: { example: 'example' } }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.config, 'example', 'module should have "example" from configuration');
        });
    });

    it('should give a npm module an asynchronously defined services', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    asyncdefineservice: {},
                    useservice: {}
                }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.service, 'example', 'module should defined "example" from services');
        });
    });

    it('should give a directory module an asynchronously defined services', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    asyncdefineservice: {},
                    useservice: {}
                }
            }
        };
        dragonnodejs(config, undefined, function (services) {
            assert.equal(services.service, 'example', 'module should defined "example" from services');
        });
    });
});
