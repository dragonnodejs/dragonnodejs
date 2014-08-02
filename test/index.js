"use strict";

var assert = require('assert');

describe('dragonnodejs/dragonnodejs', function () {

    var dragonnodejs = require('../index.js');
    var npm = './test/modules/';
    var directory = './test/modules/';

    it('should have the library in the service container after loading library', function () {
        var environmentconfig = {
            libraries: { assert: 'assert' },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(typeof services.assert, 'function', 'services.assert should be a function');
    });

    it('should allow alias for a library', function () {
        var environmentconfig = {
            libraries: { alias: 'assert' },
            modules: {}
        };
        var services = {};
        dragonnodejs(environmentconfig, services);
        assert.equal(typeof services.assert, 'undefined', 'services.assert should be undefined');
        assert.equal(typeof services.alias, 'function', 'services.alias should be a function');
    });

    it('should allow a npm module to define services', function () {
        var environmentconfig = {
            npm: npm,
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
            npm: npm,
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
            npm: npm,
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
