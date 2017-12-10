'use strict';

var mongoose = require('mongoose');
var Names = require('./collectionNames');
	 var Schema = mongoose.Schema;

var ProductSchema = new Schema({    

    name : {
        type : String
    },

    description : {
        type: String
    },

    createdon : {
        type: Date,
        default: Date.now
    },

    price : {
        type: Number
    },

    sizes : [{
        type : String,
        enum : ['small', 'Medium', 'Large', 'X-Large'],
    }],
    image : String,
    
    inventory : Number 

 }, mongoose.defaultSchemaOption); 
 
 module.exports = mongoose.model(Names.products, ProductSchema);