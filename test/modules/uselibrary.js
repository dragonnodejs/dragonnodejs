'use strict';

// Testmodule to use the library with the configured name

module.exports = function (config, libraries, services) {
    services.library = libraries[config.name];
};
