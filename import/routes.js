(function() {
  var busboy, cors;

  cors = require('cors');

  busboy = require('connect-busboy');

  module.exports.applyRoutes = function(app) {
    app.use(cors());
    app.use(busboy({
      immediate: true
    }));
    return app.route('/*').get(function(req, res) {
      return res.sendfile(app.get('appPath') + '/index.html');
    });
  };

}).call(this);
