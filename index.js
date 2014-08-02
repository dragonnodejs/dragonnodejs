"use strict";

/**
 * Load the libraries and modules with the configuration
 * @param environmentconfig
 * @param services
 */
module.exports = function (environmentconfig, services) {
    services = services || {};
    var npm = environmentconfig.npm || '';

    for (var alias in environmentconfig.libraries) {
        var name = environmentconfig.libraries[alias];

        services[alias] = require(npm + name);
    }

    for (var name in environmentconfig.modules.npm) {
        var moduleconfig = environmentconfig.modules.npm[name];

        require(npm + name)(moduleconfig, services);
    }

    var directory = environmentconfig.directory || '.';
    for (var name in environmentconfig.modules.directory) {
        var moduleconfig = environmentconfig.modules.directory[name];

        require(directory + name)(moduleconfig, services);
    }
};
