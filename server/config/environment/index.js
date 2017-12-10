var path = require('path');
var environment = process.env.NODE_ENV || 'development';

var config = {
    
    root : path.normalize(__dirname + './../../../'),
    
    mongo : {
        uri : 'mongodb://localhost/orderapp'
    },
};

function merge(config, env){
    for(var key in env){
        config[key] = env[key];
    }
    return config;
}

module.exports = merge(config, require('./' + environment));