var async = require("async");
var fs = require("fs");
var path = require("path");
require('shelljs/global');

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function browserifyMainSource(pkgName, exportName) {
function TEMPLATE() {
;(function functionName(GLOBAL) {
    var exportName = "__EXPORTNAME__";
    var parts = exportName.split('.');
    var context = GLOBAL;
    parts.forEach(function(ea) {
        !context[ea] && (context[ea] = {});
        context = context[ea];
    });
    context = require("__PACKAGENAME__");
})(window);
}

    return (String(TEMPLATE)
        .replace(/^function\s+TEMPLATE\s*\(\s*\)\s*\{\s*/, '')
        .slice(0,-2)
        .replace(new RegExp("__PACKAGENAME__",'g'), pkgName)
        .replace(new RegExp("__EXPORTNAME__",'g'), exportName));
}

function callBrowserify(options, thenDo) {
    var browserifyCmd = path.join(__dirname, "..", "node_modules","browserify","bin","cmd.js")
    exec('node ' + browserifyCmd + " " + options.join(' '), function(code, out) {
        thenDo(!code ? null : new Error(out), out);
    });
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function createBundle(options, thenDo) {
    options.browserifyFile = path.join(options.location, "browserify-me.js");
    options.bundledFile = path.join(options.location, "bundle.js");
    async.waterfall([
        function(next) {
            var source = browserifyMainSource(options.name, options.exportName || options.name);
            fs.writeFile(options.browserifyFile, source, next);
        },
        function(next) {
            callBrowserify([options.browserifyFile, '-o', options.bundledFile], next);
        },
        function(browerifyOut, next) {
            options.browerifyOutput = browerifyOut;
            next();
        }
    ], function(err) { thenDo(err, options); })
}

module.exports = {
    createBundle: createBundle
}