"use strict";

var assert = require('assert');

describe('dragonnodejs/dragonnodejs', function () {

    var dragonnodejs = require('../index.js');

    it('should add the "assert" library to the libraries container', function () {
        var config = {
            npm: '',
            libraries: {
                nodejs: { assert: 'assert' },
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: '',
            libraries: {
                nodejs: { alias: 'assert' },
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: __dirname + '/libraries/',
            libraries: {
                nodejs: {},
                npm: { definelibrary: 'definelibrary' }
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: __dirname + '/libraries/',
            libraries: {
                nodejs: {},
                npm: { alias: 'definelibrary' }
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: __dirname + '/modules/',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: '',
            modules: {
                npm: { defineservice: {} },
                directory: {}
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.example, 'example', 'module should defined "example" as service "example"');
        });
    });

    it('should give a npm module the defined services', function () {
        var config = {
            npm: __dirname + '/modules/',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: '',
            modules: {
                npm: {
                    defineservice: {},
                    useservice: {}
                },
                directory: {}
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should give a npm module the configuration', function () {
        var config = {
            npm: __dirname + '/modules/',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: '',
            modules: {
                npm: { useconfig: { example: 'example' } },
                directory: {}
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.config, 'example', 'module should defined "example" as service "config"');
        });
    });

    it('should give a npm module an asynchronous defined services', function () {
        var config = {
            npm: __dirname + '/modules/',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: '',
            modules: {
                npm: {
                    defineserviceasync: {},
                    useservice: {}
                },
                directory: {}
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'example', 'module should defined "example" as service "service"');
        });
    });

    it('should allow to invoke services to npm modules', function () {
        var config = {
            npm: __dirname + '/modules/',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: '',
            modules: {
                npm: {
                    useservice: {}
                },
                directory: {}
            }
        };
        var services = { example: 'invoked' };
        dragonnodejs(config, services, function () {
            assert.equal(services.service, 'invoked', 'module should defined "invoke" as service "service"');
        });
    });

    it('should allow a directory module to define service', function () {
        var config = {
            npm: '',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: '',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: '',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
                directory: { useconfig: { example: 'example' } }
            }
        };
        var services = {};
        dragonnodejs(config, services, function () {
            assert.equal(services.config, 'example', 'module should defined "example" as service "config"');
        });
    });

    it('should give a directory module an asynchronous defined services', function () {
        var config = {
            npm: '',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
            npm: '',
            libraries: {
                nodejs: {},
                npm: {}
            },
            directory: __dirname + '/modules/',
            modules: {
                npm: {},
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
