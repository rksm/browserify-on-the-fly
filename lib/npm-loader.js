var async = require("async");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

var shelljs = require('shelljs/global');


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var config = {
    tempDir: path.join(__dirname, 'tmp')
}

function randName(length) {
    return crypto.pseudoRandomBytes(length || 6).toString('base64').replace(/[^a-zA-Z0-9]/g,'a')
}

function ensureTempDir(dir, thenDo) {
    var complPath = path.join(config.tempDir, dir || '');
    mkdir('-p', complPath);
    thenDo(null, complPath);
}

function ensurePackageJson(folder) {}
function ensurePackageFolder(packageName, thenDo) {
    async.waterfall([
        function(next) { ensureTempDir(packageName + randName(), next); },
        function(folder, next) {
            mkdir('-p', path.join(folder, 'node_modules'));
            next(null, folder);
        }
    ], thenDo);
}

function npmInstall(packageName, folder, thenDo) {
    pushd(folder);
    exec("npm install " + packageName, function(code, out) {
        popd();
        thenDo(code ? new Error(out) : null, out);
    });
}

function cleanup(thenDo) {
    rm('-r', config.tempDir);
    thenDo(null);
}

function install(options, thenDo) {
    var packageName = options.name;
    if (!packageName) { thenDo("no package name specified", null); return; }
    var pkgSpec = {
        name: packageName,
        location: null,
        npmInstallOutput: null
    }
    async.waterfall([
        function(next) { ensurePackageFolder(packageName, next) },
        function(pkgFolder, next) {
            pkgSpec.location = pkgFolder;
            npmInstall(packageName, pkgFolder, next);
        },
        function(npmInstallOutput, next) {
            pkgSpec.npmInstallOutput = npmInstallOutput;
            next(); 
        }
    ], function(err) { thenDo(err, pkgSpec); });
}

module.exports = {
    cleanup: cleanup,
    install: install
}