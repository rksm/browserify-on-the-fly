var util = require('util');
var fs = require('fs');
var fs = require('fs');
var browserifly = require('../index');

module.exports = function(route, app, subserver) {
  app.get(module.exports.route + '/:pkgName', function(req, res) {
    var name = req.params.pkgName;
    browserifly({name: name}, function(err, result) {
      if (err) { res.status(400).end(String(err)); return; }
      var bundledStream = fs.createReadStream(result.bundledFile);
      bundledStream.pipe(res);
    });
  });
}

module.exports.route = '/browserifly';