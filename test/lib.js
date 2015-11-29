'use strict';

let assert = require('assert');

describe('dragonnodejs', () => {
    let dragonnodejs = require('../lib');

    it('should use a module already required', () => {
        let modules = [
            [require(__dirname + '/module')]
        ];
        let services = {};
        dragonnodejs('', modules, {}, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 1);
    });

    it('should load a module with directory and relative path', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 1);
    });

    it('should allow a module to use the config', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module', 'config']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 1);
        assert.equal(services.args[0].config, 'config');
    });

    it('should allow a module to use the libraries', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let libraries = 'libraries';
        let services = {};
        dragonnodejs(directory, modules, libraries, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 1);
        assert.equal(services.args[0].libraries, 'libraries');
    });

    it('should allow a module to use the services', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let services = { service: 'service' };
        dragonnodejs(directory, modules, {}, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 1);
        assert.equal(services.args[0].services.service, 'service');
    });

    it('should use several modules independently', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module', 'A'],
            ['module', 'B']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 2);
        assert.equal(services.args[0].config, 'A');
        assert.equal(services.args[1].config, 'B');
    });

    it('should not break if use all features together', () => {
        let directory = __dirname + '/';
        let modules = [
            [require(__dirname + '/module'), 'A'],
            ['module', 'B'],
            [require(__dirname + '/module'), 'C'],
            ['module', 'D']
        ];
        let libraries = 'libraries';
        let services = { service: 'service' };
        dragonnodejs(directory, modules, libraries, services);

        assert(Array.isArray(services.args));
        assert.equal(services.args.length, 4);
        assert.equal(services.args[0].config, 'A');
        assert.equal(services.args[0].libraries, 'libraries');
        assert.equal(services.args[0].services.service, 'service');
        assert.equal(services.args[1].config, 'B');
        assert.equal(services.args[1].libraries, 'libraries');
        assert.equal(services.args[1].services.service, 'service');
        assert.equal(services.args[2].config, 'C');
        assert.equal(services.args[2].libraries, 'libraries');
        assert.equal(services.args[2].services.service, 'service');
        assert.equal(services.args[3].config, 'D');
        assert.equal(services.args[3].libraries, 'libraries');
        assert.equal(services.args[3].services.service, 'service');
    });
});
