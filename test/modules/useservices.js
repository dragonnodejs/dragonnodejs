"use strict";

// Testmodule to use services

module.exports = function (config, services) {
    services.services = {
        example: services.example
    };
};
