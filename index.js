"use strict";

var async = require('async');

/**
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

    // Load Node.js and NPM installed libraries with the alias names into the library container

    config.libraries = config.libraries || {};
    var libraries = {};
    for (var alias in config.libraries.nodejs) {
        libraries[alias] = require(config.libraries.nodejs[alias]);
    }
    config.npm = config.npm || '';
    for (var alias in config.libraries.npm) {
        libraries[alias] = require(config.npm + config.libraries.npm[alias]);
    }

    // Collect NPM installed and directory modules with the configurations

    var module = function (path, config) {
        return function (libraries, services, callback) {
            return require(path)(config, libraries, services, callback);
        };
    };
    config.modules = config.modules || {};
    var modules = [];
    for (var name in config.modules.npm) {
        modules.push(module(config.npm + name, config.modules.npm[name]));
    }
    for (var name in config.modules.directory) {
        modules.push(module(config.directory + name, config.modules.directory[name]));
    }

    // Load the collected modules asynchronous as series and call the callback if defined

    var series = [];
    for (var key in modules) {
        series.push(function (module) {
            return function (callback) {
                if (!module(libraries, services, callback)) {
                    callback();
                }
            }
        }(modules[key]));
    }
    async.series(series, function () { if (callback) { callback(); } });
};
