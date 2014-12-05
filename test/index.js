"use strict";

var assert = require('assert');

describe('dragonnodejs/dragonnodejs', function () {

    var dragonnodejs = require('../index.js');
    var npm = {
        libraries: __dirname + '/libraries/',
        modules: __dirname + '/modules/'
    };
    var directory = __dirname + '/modules/';

    it('should add the "assert" library to the libraries container', function () {
        var config = {
            libraries: {
                nodejs: { assert: 'assert' }
            },
            directory: directory,
            modules: {
                directory: {
                    uselibrary: { name: 'assert' }
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(typeof services.library, 'function', 'services.library should be a function');
        });
    });

    it('should add the "assert" library with the alias to the libraries container', function () {
        var config = {
            libraries: {
                nodejs: { alias: 'assert' }
            },
            directory: directory,
            modules: {
                directory: {
                    uselibrary: { name: 'alias' }
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(typeof services.library, 'function', 'services.library should be a function');
        });
    });

    it('should add the npm installed library to the libraries container', function () {
        var config = {
            npm: npm.libraries,
            libraries: {
                npm: { definelibrary: 'definelibrary' }
            },
            directory: directory,
            modules: {
                directory: {
                    uselibrary: { name: 'definelibrary' }
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.library, 'example', 'services.library should be "example"');
        });
    });

    it('should add the npm installed library with the alias to the libraries container', function () {
        var config = {
            npm: npm.libraries,
            libraries: {
                npm: { alias: 'definelibrary' }
            },
            directory: directory,
            modules: {
                directory: {
                    uselibrary: { name: 'alias' }
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.library, 'example', 'services.library should be "example"');
        });
    });

    it('should allow a npm module to define service', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { defineservice: {} }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
        });
    });

    it('should give a npm module the defined services', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    defineservice: {},
                    useservice: {}
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should give a npm module the configuration', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: { useconfig: { example: 'example' } }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.config, 'example', 'module should defined "example" as service "config"');
        });
    });

    it('should give a npm module an asynchron defined services', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    defineserviceasync: {},
                    useservice: {}
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should allow to invoke services to npm modules', function () {
        var config = {
            npm: npm.modules,
            libraries: {},
            modules: {
                npm: {
                    useservice: {}
                }
            }
        };
        var services = { example: 'invoked' };
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'invoked', 'module should defined "invoke" as service "service"');
        });
    });

    it('should allow a directory module to define service', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { defineservice: {} }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
        });
    });

    it('should give a directory module the defined services', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    defineservice: {},
                    useservice: {}
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should give a directory module the configuration', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: { useconfig: { example: 'example' } }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.config, 'example', 'module should defined "example" as service "config"');
        });
    });

    it('should give a directory module an asynchron defined services', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    defineserviceasync: {},
                    useservice: {}
                }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should allow to invoke services to directory modules', function () {
        var config = {
            libraries: {},
            directory: directory,
            modules: {
                directory: {
                    useservice: {}
                }
            }
        };
        var services = { example: 'invoked' };
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'invoked', 'module should defined "invoke" as service "service"');
        });
    });
});
