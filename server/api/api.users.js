var Router = require('express').Router();

var Controller = appRequire('ctrl.users');

Router.get('/login', Controller.getUser);

module.exports = Router;