"use strict";

// Testmodule to asynchronously define service

module.exports = function (config, services, callback) {
    setTimeout(function () {
        services.example = 'example';
        callback();
    }, 1);
    return true;
};
