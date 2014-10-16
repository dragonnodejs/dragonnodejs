"use strict";

// testmodule to use the configuration of the module

module.exports = function (moduleconfig, services) {
    services.moduleconfig = {
        example: moduleconfig.example
    };
};
