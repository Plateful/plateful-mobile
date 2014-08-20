/**
 * Main application routes
 */


var errors = require('./components/errors');
var cors = require('cors');
var busboy = require('connect-busboy');
var express = require('express');
var Item = require('./controllers/item.controller');
var Menu = require('./controllers/menu.controller');
var Review = require('./controllers/review.controller');
var User = require('./controllers/user.controller');
var List = require('./controllers/list.controller');

var errors = require('./components/errors')
    ,cors = require('cors')
    ,busboy = require('connect-busboy')
    ,express = require('express')
    ,Item = require('./controllers/item.controller')
    ,Menu = require('./controllers/menu.controller')
    ,Review = require('./controllers/review.controller')
    ,User = require('./controllers/user.controller')
    ,Logger = require('./controllers/logger')
    ,request = require('supertest')
    ,should = require('should')





module.exports.applyRoutes = function(app) {

  // Enable all CORS Requests. Needs revising later.
  // For more configuration options: https://www.npmjs.org/package/cors
  app.use(cors());
  app.use(busboy({
    immediate: true
  }));

  // Create router for each API endpoint.
  var Items = express.Router();
  var Menus = express.Router();
  var Reviews = express.Router();
  var Users = express.Router();
  var Lists = express.Router();
  var Logs = express.Router();

  // Send API call to appropriate router.
  app.use('/api/v1/items', Items);
  app.use('/api/v1/menus', Menus);
  app.use('/api/v1/reviews', Reviews);
  app.use('/api/v1/users', Users);
  app.use('/api/v1/lists', Lists);

  // Item API routes.
  Items.get('/', Item.index);
  Items.get('/menu/:menu_id', Item.getByMenu);
  Items.get('/location/:filter', Item.getByLocation);
  Items.get('/user/:user_id', Item.getByUser);
  Items.get('/:id/photos', Item.getItemPhotos);
  Items.get('/:id/reviews', Item.getItemReviews);
  Items.get('/:id', Item.show);
  Items.post('/', Item.create);
  Items.put('/:id', Item.update);
  Items.patch('/:id', Item.update);
  Items.delete('/:id', Item.destroy);

  // Menu API routes.
  Menus.get('/', Menu.index);
  Menus.get('/:id', Menu.show);
  Menus.get('/:id/items', Menu.getMenuItems);
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

  // User API routes.
  Users.post('/signup', User.create);
  Users.post('/login', User.login);
  Users.post('/fb-login', User.fbLogin);
  Users.post('/:id/collection/:method', User.collectItem);
  Users.post('/:id/bookmarks/:method', User.bookmarkItem);
  Users.get('/:id/:data', User.getUserData);


  Logs.post('/log', Logger.log)
  Logs.post('/info', Logger.info)
  Logs.post('/warn', Logger.warn)
  Logs.post('/error', Logger.error)


  // List tab API routes.
  Lists.get('/:id', List.show);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to index.html
  app.route('/*').get(function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });

};
