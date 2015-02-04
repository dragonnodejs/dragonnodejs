"use strict";
/*global module:false */

var async = require('async');
var _ = require('underscore');

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
    _.each(config.libraries.nodejs, function (name, alias) {
        libraries[alias] = require(name);
    });
    var npm = config.npm = config.npm || '';
    _.each(config.libraries.npm, function (name, alias) {
        libraries[alias] = require(npm + name);
    });

    // Collect NPM installed and directory modules with the configurations

    var module = function (path, config) {
        return function (libraries, services, callback) {
            return require(path)(config, libraries, services, callback);
        };
    };
    config.modules = config.modules || {};
    var modules = [];
    _.each(config.modules.npm, function (config, name) {
        modules.push(module(npm + name, config));
    });
    var directory = config.directory = config.directory || '';
    _.each(config.modules.directory, function (config, name) {
        modules.push(module(directory + name, config));
    });

    // Load the collected modules asynchronous as series and call the callback if defined

    var series = [];
    _.each(modules, function (module) {
        series.push(function (module) {
            return function (callback) {
                if (!module(libraries, services, callback)) {
                    callback();
                }
            }
        }(module));
    });
    async.series(series, function () { if (callback) { callback(); } });
};
