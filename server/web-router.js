var path = require('path');
var express = require('express');
var config = appRequire('config');

var ResponseUtils = appRequire('utils.response');
var session = require('express-session');
var auth = require('http-auth');

var Router = express.Router();
var bodyParser = require( 'body-parser' );

// var serve   = require('express-static');

Router.get('/', function (req, res) {
    return res.redirect('/home');
});

Router.use('/home', express.static(path.join(config.root, 'client', 'dashboard')));
// Router.use('/products', express.static(path.join(config.root, 'client', 'dashboard')));

Router.use('/', express.static(path.join(config.root, 'client', 'dashboard')));
Router.use('/resources', express.static(path.join(config.root, 'client', 'dashboard', 'bower_components')));
Router.use('/commons', express.static(path.join(config.root, 'client', 'commons')));

// Router.use('/api*', restrictApi);

Router.use('/api/users', appRequire('api.users'));
Router.use('/api/products', appRequire('api.products'));


// Router.use('/login',serve( path.join(config.root, 'client', 'login')));




module.exports = Router;