var Router = require('express').Router();

var Controller = appRequire('ctrl.products');

Router.get('/*', Controller.getAllProducts);

module.exports = Router;