'use strict';

/**
 * Module for unit testing which saves all arguments of all calls
 * @example
    ['module']
 */

module.exports = (config, libraries, services) => {
    services.args = services.args || [];
    services.args.push({ config, libraries, services });
};
