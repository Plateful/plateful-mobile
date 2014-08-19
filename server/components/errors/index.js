/**
 * Error responses
 */

'use strict';

var pageNotFound;

module.exports[404] = pageNotFound = function(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };
  res.status(result.status);
  res.render(viewFilePath, function(err) {
    if (err) {
      return res.json(result);
    }
    res.render(viewFilePath);
  });
};
