"use strict";
/*global module:false */

var async = require('async');
var _ = require('underscore');

/**
 * Load the libraries and modules with the configuration
 * @example
    var config = {
        libraries: {},
        directory: __dirname + '/modules/',
        modules: {
            npm: [],
            directory: {}
        }
    };
    require('dragonnodejs')(config);
 */

module.exports = function (config, services, callback) {
    services = services || {};

    // Collect NPM installed and directory modules with the configurations

    config.modules = config.modules || {};
    var modules = [];
    _.each(config.modules.npm, function (module) {
        modules.push(function (libraries, services, callback) {
            return module[0](module[1], libraries, services, callback);
        });
    });
    var directory = config.directory = config.directory || '';
    _.each(config.modules.directory, function (config, name) {
        modules.push(function (libraries, services, callback) {
            return require(directory + name)(config, libraries, services, callback);
        });
    });

    // Load the collected modules asynchronous as series and call the callback if defined

    var series = [];
    _.each(modules, function (module) {
        series.push(function (callback) {
            if (!module(config.libraries, services, callback)) {
                callback();
            }
        });
    });
    async.series(series, function () { if (callback) { callback(); } });
};
