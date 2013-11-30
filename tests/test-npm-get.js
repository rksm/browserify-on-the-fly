// continously run with:
// nodemon -x nodeunit --reporter "minimal" tests/test-npm-get.js

require('shelljs/global');
var shelljs = require('shelljs');

var testSuite = {},
    npmLoader = require('../lib/npm-loader'),
    path = require('path'),
    fs = require('fs');

testSuite.NpmInstallPackageTest = {

  setUp: function(run) {
    run();
  },

  tearDown: function(run) {
      npmLoader.cleanup(run);
  },

  "fetch package and put it into temp dir": function(test) {
      npmLoader.install({name: 'async'}, function(err, result) {
        test.ok(!err, err);
        test.ok(fs.existsSync(result.location));
        var asyncDir = path.join(result.location, 'node_modules', 'async');
        test.ok(fs.existsSync(asyncDir));
        var installedAsync = require(asyncDir);
        test.ok(!!installedAsync.series, 'No async installed?');
        test.done();
      });
  }

}

exports.testSuite = testSuite;
