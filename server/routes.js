var errors = require('./components/errors');
var cors = require('cors');
var busboy = require('connect-busboy');
var express = require('express');
var Item = require('./controllers/item.controller');
var Menu = require('./controllers/menu.controller');
var Review = require('./controllers/review.controller');

module.exports.applyRoutes = function(app) {
  app.use(cors());
  app.use(busboy({
    immediate: true
  }));

  // Create router for each API endpoint.
  var Items = express.Router();
  var Menus = express.Router();
  var Reviews = express.Router();

  // Send API call to appropriate router.
  app.use('/api/v1/items', Items);
  app.use('/api/v1/menus', Menus);
  app.use('/api/v1/reviews', Reviews);

  // Item API routes.
  Items.get('/', Item.index);
  Items.get('/business/:menu_id', Item.getByMenu);
  Items.post('/location', Item.getByLocation);
  Items.get('/user/:user_id', Item.getByUser);
  Items.get('/:id', Item.show);
  Items.post('/', Item.create);
  Items.put('/:id', Item.update);
  Items.patch('/:id', Item.update);
  Items.delete('/:id', Item.destroy);

  // Menu API routes.
  Menus.get('/', Menu.index);
  Menus.get('/:id', Menu.show);
  Menus.post('/location', Menu.getByLocation);
  Menus.post('/', Menu.create);
  Menus.put('/:id', Menu.update);
  Menus.patch('/:id', Menu.update);
  Menus.delete('/:id', Menu.destroy);

  // Review API routes.
  Reviews.get('/', Review.index);
  Reviews.get('/business/:menu_id', Review.getByMenu);
  Reviews.get('/user/:user_id', Review.getByUser);
  Reviews.get('/item/:item_id', Review.getByItem);
  Reviews.get('/:id', Review.show);
  Reviews.post('/', Review.create);
  Reviews.put('/:id', Review.update);
  Reviews.patch('/:id', Review.update);
  Reviews.delete('/:id', Review.destroy);

  // Page not found.
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // Catchall.
  app.route('/*').get(function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });
};
