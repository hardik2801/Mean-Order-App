var Router = require('express').Router();

var Controller = appRequire('ctrl.cart');

Router.put('/createOrder', Controller.createOrder);
Router.put('/addCustomer', Controller.addCustomer);

module.exports = Router;