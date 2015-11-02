'use strict';

/**
 * Run the modules with the libraries and the services
 * @example
    var config = {
        directory: __dirname + '/',
        libraries: {
            library: require('library')
        },
        modules: [
            [require('bundle'), [
                ['modules/module', {}]
            ]],
            ['modules/module', {}]
        ]
    };
    require('dragonnodejs')(config);
 */

module.exports = (config, services) => {
    services = services || {};
    for (let module of config.modules) {
        if (typeof module[0] === 'string') {
            module[0] = require(config.directory + module[0]);
        }
        module[0](module[1], config.libraries, services);
    }
};
