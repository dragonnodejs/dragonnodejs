'use strict';

// Module to use the config

module.exports = (config, libraries, services) => {
    services[config.key] = config.value;
};
