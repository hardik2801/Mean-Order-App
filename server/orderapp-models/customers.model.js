'use strict';

var mongoose = require('mongoose');
var Names = require('./collectionNames');
	 var Schema = mongoose.Schema;

var CustomersSchema = new Schema({    

    name : {
        type : String
    },

    email : {
        type: String
    },

    createdon : {
        type: Date,
        default: Date.now
    },

    orders : [{
        type : Schema.Types.ObjectId,
        ref: Names.orders
    }],

 }, mongoose.defaultSchemaOption); 
 
 module.exports = mongoose.model(Names.customers, CustomersSchema);