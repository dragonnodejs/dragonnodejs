[![Travis CI](https://travis-ci.org/dragonnodejs/dragonnodejs.svg?branch=master "Travis CI")]
    (https://travis-ci.org/dragonnodejs/dragonnodejs)

# DragonNode.js
Framework to develop modular and testable Node.js applications
- Separate configuration and implementation of modules
- Service container to use services from other modules or define new services in the modules
- Allow to mock libraries and services for testing modules as independent units
- Group modules to bundles and share them with other developers
- Support asynchronous modules and bundles

## Installation
- Fork and/or clone the app-skeleton repository
- Execute "npm install"
- Start the application with "npm start"

## Define new module
- Add new file or directory to the module directory with the name of the new module, for example "./modules/example.js":
```javascript
/*
 * Description for the module
 * @example
    example: {}
 */

module.exports = function (config, services) {
    // Implementation for the module
};
```
- Extend the configuration for the application, for example "app/config.js":
```javascript
module.exports = {
    modules: {
        directory: {
            example: {
                // Configuration for the module
            }
        }
    }
};
```
