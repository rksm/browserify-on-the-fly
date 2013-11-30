// continously run with:
// nodemon -x nodeunit --reporter "minimal" tests/test-*.js

require('shelljs/global');
var shelljs = require('shelljs');

var testSuite = {},
    npmLoader = require('../lib/npm-loader'),
    browserifly = require('../index'),
    path = require('path'),
    fs = require('fs');

testSuite.BorwseriflyTest = {

  setUp: function(run) {
    run();
  },

  tearDown: function(run) {
      npmLoader.cleanup(run);
  },

  "test browserifly package": function(test) {
    browserifly({name: "async"}, function(err, result) {
      test.ok(fs.existsSync(result.bundledFile), 'no bundled file created!');
      var content = fs.readFileSync(result.bundledFile).toString();
      test.ok(-1 !== content.indexOf('context = require("async");'), 'bundled file not ok?')
      
      test.done();
    });
  }
}

exports.testSuite = testSuite;
