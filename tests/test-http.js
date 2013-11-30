var subserver = require('../lib/subserver.js'),
    tester = require('lively-pluggable-server'),
    port = 9003, server;

subserver.route = '/browserifly';

var tests = {
  setUp: function (callback) {
    tester.start({port: port, subservers: [subserver]}, function(err, s) {
      server = s; callback(err); });
  },
  tearDown: function (callback) {
    tester.stop(server, callback);
  },
  testSimpleLoad: function (test) {
    tester.get(server, subserver.route+'/async', function(err, res, body) {
      test.ok(-1 !== body.indexOf('context = require("async");'), 'bundled file not ok?');
      test.done();
    });
  }
};

module.exports = tests;
