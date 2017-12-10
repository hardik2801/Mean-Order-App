var requireConfig = require('./require-config');

global.appRequire = function(alias){    
    return require(__dirname + '/' +requireConfig[alias.toLowerCase()]);
};

var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = appRequire('config');
var ResponseUtils = appRequire('utils.response');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.uri, config.mongo.options);

app.use(bodyParser.json({limit: '5mb'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var sessionConfig = {
    secret : '95b05fbb1aa74c04ca2e937d43a059xu',
	resave : false,
	saveUninitialized : false
};

app.use(session(sessionConfig));

app.use(function (err, req, res, next){
    if(err){
        console.log('error in connection');
        console.log(err);
        return res.json(ResponseUtils.responseError(err));
    } 
    next();
});

require('./router')(app);

var server = http.createServer(app);

server.listen(config.port, config.host, function(){
    console.log('Magic is happenning on PORT ' + config.port + ' on ' + config.host);	
});

process.on('SIGTERM', function(){
    console.log('Server shutting down!!');
    mongoose.connection.close();
    process.exit(0);
});