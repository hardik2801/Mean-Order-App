var ResponseUtils = appRequire('utils.response');
var mongoose = require('mongoose');

var customersModel = appRequire('model.customers');
var ordersModel = appRequire('model.orders');

module.exports = {
    createOrder : createOrder,
    addCustomer : addCustomer
};

function createOrder(req, res){
    var cart = req.body.cartObj;
    var customer = req.body.customer;

    if(cart.length < 1) {
        return res.json(ResponseUtils.responseError("No Product to create order"))
    }
     
    newOrder = new ordersModel();
    newOrder.products = cart;
    newOrder.customer = customer;
    console.log(newOrder, "obj");

    newOrder.save(function(err, savedDoc) {
        if(err) {
            console.log(err);
            return res.json(ResponseUtils.responseError(err));
        }
        else {
            return res.json(ResponseUtils.responseSuccess(savedDoc));
        }
    });
}

function addCustomer(req, res) {
    var customer = req.body.customer;

    var newcustomer = new customersModel(customer);
    newcustomer.save(function(err, savedDoc) {
        if(err) {
            console.log(err);
            return res.json(ResponseUtils.responseError(err));
        }
        else {
            return res.json(ResponseUtils.responseSuccess(savedDoc));
        }
    });
}