"use strict";

var assert = require('assert');

describe('dragonnodejs/dragonnodejs', function () {

    var dragonnodejs = require('../index.js');
    var npm = {
        libraries: './test/libraries/',
        modules: './test/modules/'
    };
    var directory = './test/modules/';

    it('should have the nodejs library in the service container', function () {
        var environmentconfig = {
            libraries: {
                nodejs: { events: 'events' }
            },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(typeof services.events, 'object', 'services.events should be a object');
    });

    it('should allow alias for a nodejs library', function () {
        var environmentconfig = {
            libraries: {
                nodejs: { alias: 'events' }
            },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(typeof services.events, 'undefined', 'services.events should be undefined');
        assert.equal(typeof services.alias, 'object', 'services.alias should be a object');
    });

    it('should have the npm library in the service container', function () {
        var environmentconfig = {
            npm: npm.libraries,
            libraries: {
                npm: { definelibrary: 'definelibrary' }
            },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.definelibrary, 'example', 'services.definelibrary should be "example"');
    });

    it('should allow alias for a npm library', function () {
        var environmentconfig = {
            npm: npm.libraries,
            libraries: {
                npm: { alias: 'definelibrary' }
            },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(typeof services.definelibrary, 'undefined', 'services.definelibrary should be undefined');
        assert.equal(services.alias, 'example', 'services.definelibrary should be "example"');
    });

    it('should allow a npm module to define services', function () {
        var environmentconfig = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { defineservices: {} }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
    });

    it('should give a npm module the defined services', function () {
        var environmentconfig = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    defineservices: {},
                    useservices: {}
                }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.services.example, 'example', 'module should defined "example" from services');
    });

    it('should give a npm module the configuration', function () {
        var environmentconfig = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { usemoduleconfig: { example: 'example' } }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.moduleconfig.example, 'example', 'module should have "example" from configuration');
    });

    it('should allow a directory module to define services', function () {
        var environmentconfig = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { defineservices: {} }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
    });

    it('should give a directory module the defined services', function () {
        var environmentconfig = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    defineservices: {},
                    useservices: {}
                }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.services.example, 'example', 'module should defined "example" from services');
    });

    it('should give a directory module the configuration', function () {
        var environmentconfig = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { usemoduleconfig: { example: 'example' } }
            }
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(services.moduleconfig.example, 'example', 'module should have "example" from configuration');
    });
});
