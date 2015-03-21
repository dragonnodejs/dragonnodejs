'use strict';

// Testmodule to define service asynchron

module.exports = function (config, libraries, services, callback) {
    setTimeout(function () {
        services.example = 'example';
        callback();
    }, 1);
    return true;
};
