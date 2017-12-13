var Router = require('express').Router();

var Controller = appRequire('ctrl.orders');

Router.get('/*', Controller.getAllOrders);

module.exports = Router;