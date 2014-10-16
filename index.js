"use strict";

// load the libraries and modules with the configuration

module.exports = function dragonnodejs(environmentconfig, services) {
    services = services || {};
    services.dragonnodejs = dragonnodejs;

    for (var alias in environmentconfig.libraries.nodejs) {
        var name = environmentconfig.libraries.nodejs[alias];

        services[alias] = require(name);
    }

    var npm = environmentconfig.npm || '';

    for (var alias in environmentconfig.libraries.npm) {
        var name = environmentconfig.libraries.npm[alias];

        services[alias] = require(npm + name);
    }

    for (var name in environmentconfig.modules.npm) {
        var moduleconfig = environmentconfig.modules.npm[name];

        require(npm + name)(moduleconfig, services);
    }

    for (var name in environmentconfig.modules.directory) {
        var moduleconfig = environmentconfig.modules.directory[name];

        require(environmentconfig.directory + name)(moduleconfig, services);
    }
};
