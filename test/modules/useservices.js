"use strict";

// testmodule to use services

module.exports = function (moduleconfig, services) {
    services.services = {
        example: services.example
    };
};
