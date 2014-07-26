(function() {
  'use strict';
  var pageNotFound;

  module.exports[404] = pageNotFound = function(req, res) {
    var result, statusCode, viewFilePath;
    viewFilePath = '404';
    statusCode = 404;
    result = {
      status: statusCode
    };
    res.status(result.status);
    return res.render(viewFilePath, function(err) {
      if (err) {
        return res.json(result, result.status);
      }
      return res.render(viewFilePath);
    });
  };

}).call(this);
