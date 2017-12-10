'use strict';

var mongoose = require('mongoose');
var Names = require('./collectionNames');
	 var Schema = mongoose.Schema;

var UserSchema = new Schema({    

    username : {
        type : String
    },

    email : {
        type: String
    },

    password : {
        type: String
    }

 }, mongoose.defaultSchemaOption); 
 
 module.exports = mongoose.model(Names.user, UserSchema);