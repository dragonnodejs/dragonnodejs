'use strict';

let assert = require('assert');

describe('dragonnodejs', () => {
    let dragonnodejs = require('../index.js');

    it('should use a module already required', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/defineservice'],
                [require(__dirname + '/modules/loadmodule')]
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.module, 'module', 'services.module should be "module"');
    });

    it('should load a module with directory config and relative path', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/loadmodule']
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.module, 'module', 'services.module should be "module"');
    });

    it('should allow a module to define a service', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/defineservice']
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.service, 'service', 'services.service should be "service"');
    });

    it('should allow a module to use the config', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/useconfig', 'config']
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.config, 'config', 'services.config should be "config"');
    });

    it('should allow a module to use the libraries', () => {
        let config = {
            directory: __dirname + '/',
            libraries: 'libraries',
            modules: [
                ['modules/uselibraries']
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.libraries, 'libraries', 'services.libraries should be "libraries"');
    });

    it('should allow a module to use the services', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/useservices']
            ]
        };
        let services = { service: 'service' };
        dragonnodejs(config, services);
        assert.equal(services.services.service, 'service', 'services.services.service should be "service"');
    });

    it('should allow a define more as one module and use the different configs', () => {
        let config = {
            directory: __dirname + '/',
            modules: [
                ['modules/useconfigs', { key: 'configA', value: 'A' }],
                ['modules/useconfigs', { key: 'configB', value: 'B' }]
            ]
        };
        let services = {};
        dragonnodejs(config, services);
        assert.equal(services.configA, 'A', 'services.configA should be "A"');
        assert.equal(services.configB, 'B', 'services.configB should be "B"');
    });
});
