"use strict";

// testmodule to use the configuration of the module

module.exports = function (config, services) {
    services.config = {
        example: config.example
    };
};
