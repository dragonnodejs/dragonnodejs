"use strict";

var async = require('async');

/*
 * Load the libraries and modules with the configuration
 * @example
    var config = {
        npm: __dirname + '/node_modules/',
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

module.exports = function (config, services, callback) {
    services = services || {};

    // Load Node.js and NPM installed libraries with the alias names to the library container

    var libraries = {};
    for (var alias in config.libraries.nodejs) {
        libraries[alias] = require(config.libraries.nodejs[alias]);
    }
    for (var alias in config.libraries.npm) {
        libraries[alias] = require(config.npm + config.libraries.npm[alias]);
    }

    // Collect NPM installed and directory modules with the configurations

    var modules = [];
    for (var name in config.modules.npm) {
        modules.push({
            invoke: require(config.npm + name),
            config: config.modules.npm[name]
        });
    }
    for (var name in config.modules.directory) {
        modules.push({
            invoke: require(config.directory + name),
            config: config.modules.directory[name]
        });
    }

    // Load the collected modules asynchron as serie and call the callback if defined

    var series = [];
    for (var key in modules) {
        series.push(function (module) {
            return function (callback) {
                if (!module.invoke(module.config, libraries, services, callback)) {
                    callback();
                }
            }
        }(modules[key]));
    }
    async.series(series, function () { if (callback) { callback(); } });
};
