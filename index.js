var browserifyWrapper = require("./lib/browserify-wrapper");
var async = require("async");
var npmLoader = require('./lib/npm-loader');
// var fs = require("fs");
// var path = require("path");
// var crypto = require("crypto");

// var shelljs = require('shelljs/global');

var debug = true;

function log(/*args*/) {
    process.stdout.write('browserifly: ');
    console.log.apply(console, arguments);
}


function browserifly(options, thenDo) {
    log(options)
    async.waterfall([
        function(next) { npmLoader.install({name: options.name}, next); },
        function(installResult, next) {
            browserifyWrapper.createBundle(installResult, next);
        }
    ], function(err, browserifyResult) { thenDo(err, browserifyResult); });
}

module.exports = browserifly