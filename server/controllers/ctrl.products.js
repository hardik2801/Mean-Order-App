var ResponseUtils = appRequire('utils.response');
var mongoose = require('mongoose');

var productsModel = appRequire('model.products');

module.exports = {
    getAllProducts : getAllProducts,
};

function getAllProducts(req, res){
    var username = req.query.email;
    var password = req.query.password;
    productsModel.find({}, function(err, result){
        if(err) {
            return res.json(ResponseUtils.responseError(null, err));
        }
        if(result) {
            return res.json(ResponseUtils.responseSuccess(result));
        } else {
            return res.json(ResponseUtils.responseMessage(false, "No Product Found"));
        }
    });


    // return res.json(ResponseUtils.responseMessage(true, 'successfully invokeapi'));
}