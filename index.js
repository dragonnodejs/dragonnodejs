"use strict";

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

    var modules = [];

    // Collect NPM installed modules with the configurations

    _.each(config.modules.npm, function (module) {
        modules.push(function (libraries, services, callback) {
            return module[0](module[1], libraries, services, callback);
        });
    });

    // Collect directory modules with the configurations

    var directory = config.directory;
    _.each(config.modules.directory, function (config, name) {
        modules.push(function (libraries, services, callback) {
            return require(directory + name)(config, libraries, services, callback);
        });
    });

    // Load the collected modules asynchronous as series and call the callback if defined

    async.eachSeries(
        modules,
        function (module, callback) {
            if (!module(config.libraries, services, callback)) {
                callback();
            }
        },
        function () { if (callback) { callback(); } }
    );
};
