"use strict";

var async = require('async');

/*
 * Load the libraries and modules with the configuration
 * @example
    var config = {
        npm: '',
        libraries: {
            nodejs: {},
            npm: {}
        },
        directory: __dirname + '/modules/',
        modules: {
            npm: {},
            directory: {}
        }
    };
    require('dragonnodejs')(config);
 */

module.exports = function dragonnodejs(config, services, callback) {
    services = services || { dragonnodejs: dragonnodejs };

    // Assign Node.js and npm installed libraries with alias names to the services

    for (var alias in config.libraries.nodejs) {
        services[alias] = require(config.libraries.nodejs[alias]);
    }
    var npm = config.npm || '';
    for (var alias in config.libraries.npm) {
        services[alias] = require(npm + config.libraries.npm[alias]);
    }

    // Collect npm installed and project modules with the configurations

    var modules = [];
    for (var name in config.modules.npm) {
        modules.push({ config: config.modules.npm[name], constructor: require(npm + name) });
    }
    for (var name in config.modules.directory) {
        modules.push({ config: config.modules.directory[name], constructor: require(config.directory + name) });
    }

    // Load the collected modules asynchronous as serie

    var series = [];
    for (var key in modules) {
        var module = modules[key];
        series.push(function (module) { return function (callback) {
            var asynchronous = module.constructor(module.config, services, callback);
            if (!asynchronous) {
                callback();
            }
        } }(module));
    }
    async.series(series, function () { if (callback) { callback(services); } });
};
