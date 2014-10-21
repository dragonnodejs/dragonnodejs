"use strict";

/*
 * Load the libraries and modules with the configuration
 * @example
    var config = {
        libraries: {},
        directory: __dirname + '/modules/',
        modules: {
            directory: {}
        }
    };
    require('dragonnodejs')(config);
 */

module.exports = function dragonnodejs(config, services) {
    services = services || { dragonnodejs: dragonnodejs };

    for (var alias in config.libraries.nodejs) {
        services[alias] = require(config.libraries.nodejs[alias]);
    }

    var npm = config.npm || '';

    for (var alias in config.libraries.npm) {
        services[alias] = require(npm + config.libraries.npm[alias]);
    }

    for (var name in config.modules.npm) {
        require(npm + name)(config.modules.npm[name], services);
    }

    for (var name in config.modules.directory) {
        require(config.directory + name)(config.modules.directory[name], services);
    }

    return services;
};
