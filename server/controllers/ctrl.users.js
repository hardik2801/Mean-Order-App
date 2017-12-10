var ResponseUtils = appRequire('utils.response');
var mongoose = require('mongoose');

var usersModel = appRequire('model.users');

module.exports = {
    getUser : getUser,
};

function getUser(req, res){
    var username = req.query.email;
    var password = req.query.password;
    usersModel.findOne({email : username, password : password}, function(err, result){
        if(err) {
            return res.json(ResponseUtils.responseError(null, err));
        }
        if(result) {
            return res.json(ResponseUtils.responseSuccess(result));
        } else {
            return res.json(ResponseUtils.responseMessage(false, "No User Found"));
        }
    });


    // return res.json(ResponseUtils.responseMessage(true, 'successfully invokeapi'));
}