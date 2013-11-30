/*
 * this needs the dev dependencies to be installed
 * start with
 * node examples/example-server.js
 */
var subserver = require('../lib/subserver.js'), // <-- get the interface
    serverManager = require('lively-pluggable-server'), // <-- just a wrapper to restify
    port = 9004;

subserver.route = '/browserifly';

// start a restify server. When you browse to hostname:port/browserifly/async
// you should see stuff
serverManager.start({port: port, subservers: [subserver]}, function(err, server) {
    console.log("browserifly flying! Now serving npm modules hoy and fresh on route %s", subserver.route);
});
