'use strict';

var mongoose = require('mongoose');
var Names = require('./collectionNames');
	 var Schema = mongoose.Schema;

var OrdersSchema = new Schema({    

    customer : {
        type : Schema.Types.ObjectId,
        ref: Names.customers
    },

    createdon : {
        type: Date,
        default: Date.now
    },

    products : [{
        type : Schema.Types.ObjectId,
        ref: Names.products
    }],

 }, mongoose.defaultSchemaOption); 
 
 module.exports = mongoose.model(Names.orders, OrdersSchema);