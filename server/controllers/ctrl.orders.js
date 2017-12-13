var ResponseUtils = appRequire('utils.response');
var mongoose = require('mongoose');

var ordersModel = appRequire('model.orders');
var customersModel = appRequire('model.customers');
var productsModel = appRequire('model.products');

module.exports = {
    getAllOrders : getAllOrders,
};

function getAllOrders(req, res){
    
    ordersModel.find({})
    .populate({
        path : 'products customer',
    }).exec(function(err, result){
        if(err) {
            return res.json(ResponseUtils.responseError(null, err));
        }
        if(result) {
            return res.json(ResponseUtils.responseSuccess(result));
        } else {
            return res.json(ResponseUtils.responseMessage(false, "No Orders Found"));
        }
    });
}